
import generate from 'babel-generator'

const TAG = '[babel-plugin-transform-reactive-di]'

const getTypesinfo = {
    ImportDeclaration(path, state) {
        /* eslint-disable no-param-reassign */
        const node = path.node
        const strPath = node.source.value
        if (strPath === state.reflectImport) {
            state.injectId = node.specifiers[0].local
        }
        if (strPath === state.ambiantTypeCastImport) {
            state.ambiantTypeCast = path
        }
    },
    ImportSpecifier(path, state) {
        const node = path.node
        const parent = path.parent
        if (parent.importKind !== 'type') {
            return
        }
        state.interfaceArgs.set(node.local.name, node.imported.name)
    },
    TypeAlias(path, state) {
        const node = path.node
        const parent = path.parent
        if (parent.type !== 'ExportNamedDeclaration') {
            return
        }
        state.interfaceArgs.set(node.id.name, node.id.name)
    }
}

const addReflections = {
    TypeCastExpression(path, {magicTypeCasts, magicTypeCastExpression}) {
        if (path.node.expression.name === magicTypeCastExpression) {
            magicTypeCasts.push(path)
        }
    },

    'ClassDeclaration|FunctionDeclaration'(path, {defineParamTypes}) {
        const node = path.node
        const parent = path.parent
        const ref = node.id

        if (
            parent.type === 'ExportNamedDeclaration'
            || parent.type === 'ExportDefaultDeclaration'
        ) {
            let params;
            if (node.type === 'ClassDeclaration') {
                const constr = node.body.body.find((bodyNode) =>
                    bodyNode.type === 'ClassMethod'
                    && bodyNode.kind === 'constructor'
                )
                if (constr) {
                    params = constr.params
                }
            } else {
                params = node.params
            }

            if (params) {
                path.parentPath.insertAfter(defineParamTypes(params, ref))
            }
        }
    }
}

function typeForAnnotation(t, interfaceArgs, annotation) {
    if (!annotation) {
        return null;
    }
    // console.log(path)
    switch (annotation.type) {
        case 'StringTypeAnnotation':
            return t.identifier('String');
        case 'NumberTypeAnnotation':
            return t.identifier('Number');
        case 'BooleanTypeAnnotation':
            return t.identifier('Boolean');
        case 'VoidTypeAnnotation':
            return t.unaryExpression('void', t.numericLiteral(0));
        case 'GenericTypeAnnotation': {
            if (annotation.typeParameters) {
                const genericCode = generate(annotation).code
                const plainCode = generate(annotation.id).code
                /* eslint-disable no-console */
                console.warn(
                    `${TAG} Generic type is not supported: ${genericCode} Just use: ${plainCode}`
                )
            }
            let id = annotation.id
            const imported = interfaceArgs.get(id.name)
            if (imported) {
                id = t.stringLiteral(imported)
            }
            return id
        }
        case 'ObjectTypeAnnotation':
            return t.identifier('Object');
        case 'FunctionTypeAnnotation':
            return t.identifier('Function');
        default:
            return null;
    }
}

function createTypeForAnnotations(t, interfaceArgs, argComment) {
    return function typeForAnnotations(types) {
        const result = []
        for (let i = 0, l = types.length; i < l; i++) {
            const type = types[i]
            const typeAnnotation = type.typeAnnotation && type.typeAnnotation.typeAnnotation
            const id = typeForAnnotation(t, interfaceArgs, typeAnnotation)
            if (type.leadingComments && type.leadingComments.length > 0) {
                const comment = (type.leadingComments[0].value || '').trim()
                if (comment === argComment) {
                    break
                }
            }
            // console.log(type.leadingComments)
            if (id) {
                result.push(id)
            }
        }
        return result
    }
}

function createReflectionParamTypes(t, key, typeForAnnotations) {
    const callee = t.memberExpression(t.identifier('Reflect'), t.identifier('defineMetadata'))

    return function defineMetadata(types, target) {
        return t.expressionStatement(t.callExpression(
            callee,
            [t.stringLiteral(key), t.arrayExpression(typeForAnnotations(types)), target]
        ))
    }
}

function createInjectParamTypes(t, injectId, typeForAnnotations) {
    return function defineMetadata(types, target) {
        return t.expressionStatement(t.callExpression(
            injectId,
            [t.arrayExpression(typeForAnnotations(types)), target]
        ))
    }
}

export default function babelPluginTransformReactiveDi({types: t}) {
    return {
        visitor: {
            Program(path, {file, opts}) {
                const state = {
                    reflectImport: opts.reflectImport,
                    ambiantTypeCastImport:
                        opts.ambiantTypeCastImport || 'babel-plugin-transform-reactive-di/_',

                    injectId: null,
                    ambiantTypeCast: null,
                    interfaceArgs: new Map()
                }
                path.traverse(getTypesinfo, state)

                let defineParamTypes;
                let reactImportDeclaration;

                const interfaceArgs = state.interfaceArgs
                const typeForAnnotations = createTypeForAnnotations(
                    t,
                    interfaceArgs,
                    opts.argComment || '@args'
                )
                if (opts.reflectImport) {
                    const injectId = state.injectId || file.scope.generateUidIdentifier('inject')
                    if (!state.injectId) {
                        reactImportDeclaration = t.importDeclaration([
                            t.importDefaultSpecifier(injectId)
                        ], t.stringLiteral(opts.reflectImport))
                    }
                    defineParamTypes = createInjectParamTypes(t, injectId, typeForAnnotations)
                } else {
                    defineParamTypes = createReflectionParamTypes(
                        t,
                        'design:paramtypes',
                        typeForAnnotations
                    )
                }
                const reflectionState = {
                    defineParamTypes,
                    magicTypeCasts: [],
                    magicTypeCastExpression: state.ambiantTypeCast
                        ? state.ambiantTypeCast.node.specifiers[0].local.name
                        : ''
                }

                path.traverse(addReflections, reflectionState)

                reflectionState.magicTypeCasts.forEach((p) => {
                    const node = p.node
                    const typeAnnotation = node.typeAnnotation && node.typeAnnotation.typeAnnotation
                    const id = typeAnnotation.id
                    const name = interfaceArgs.get(id.name)
                    if (name) {
                        p.replaceWith(t.stringLiteral(name))
                    }
                })

                if (state.ambiantTypeCast) {
                    state.ambiantTypeCast.remove()
                }

                if (reactImportDeclaration) {
                    path.node.body.unshift(reactImportDeclaration)
                }
            }
        }
    }
}
