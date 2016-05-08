import getTypesInfo from './visitors/getTypesInfo'
import addReflections from './visitors/addReflections'

import createTypeForAnnotation from './factories/createTypeForAnnotation'
import createCreateCreateGenericTypeMetadata from
    './factories/createCreateCreateGenericTypeMetadata'
import createCreateCreateObjectTypeMetadata from './factories/createCreateCreateObjectTypeMetadata'
import createTypeForAnnotations from './factories/createTypeForAnnotations'
import createReflectionParamTypes from './factories/createReflectionParamTypes'
import createInjectParamTypes from './factories/createInjectParamTypes'
import createHasComment from './factories/createHasComment'

import createReplaceMagicTypeCasts from './modifiers/createReplaceMagicTypeCasts'
import createParentPathInsertAfter from './modifiers/createParentPathInsertAfter'
import createGetUniqueTypeName from './factories/createGetUniqueTypeName'

export default function babelPluginTransformReactiveDi({types: t}) {
    return {

        visitor: {
            Program(path, {file, opts}) {
                const getUniqueTypeName = createGetUniqueTypeName(
                    opts.typeNameStrategy || 'fullPath'
                )
                const state = {
                    getUniqueTypeName,
                    reflectImport: opts.reflectImport,
                    ambiantTypeCastImport:
                        opts.ambiantTypeCastImport || 'babel-plugin-transform-metadata/_',

                    injectId: null,
                    ambiantTypeCast: null,
                    internalTypes: new Map(),
                    externalTypeNames: new Map(),
                    exportNames: new Map()
                }
                path.traverse(getTypesInfo, state)

                const replaceMagicTypeCasts = createReplaceMagicTypeCasts(
                    t,
                    state.externalTypeNames
                )
                const hasComment = createHasComment(opts.argComment || '@args')
                const createCreateObjectTypeMetadata = createCreateCreateObjectTypeMetadata(
                    t,
                    hasComment
                )
                const createCreateGenericTypeMetadata = createCreateCreateGenericTypeMetadata(
                    t,
                    state.externalTypeNames,
                    state.internalTypes
                )
                const typeForAnnotation = createTypeForAnnotation(
                    t,
                    state.externalTypeNames,
                    createCreateObjectTypeMetadata,
                    createCreateGenericTypeMetadata
                )
                const typeForAnnotations = createTypeForAnnotations(
                    hasComment,
                    typeForAnnotation
                )

                let defineParamTypes;
                let reactImportDeclaration;

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

                const parentPathInsertAfter = createParentPathInsertAfter(defineParamTypes)

                const reflectionState = {
                    magicTypeCasts: [],
                    parentPaths: [],
                    exportNames: state.exportNames,
                    magicTypeCastExpression: state.ambiantTypeCast
                        ? state.ambiantTypeCast.node.specifiers[0].local.name
                        : ''
                }

                path.traverse(addReflections, reflectionState)

                reflectionState.magicTypeCasts.forEach(replaceMagicTypeCasts)
                reflectionState.parentPaths.forEach(parentPathInsertAfter)
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
