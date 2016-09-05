const addReflections = {
    TypeCastExpression(path, {magicTypeCasts, magicTypeCastExpression}) {
        if (path.node.expression.name === magicTypeCastExpression) {
            magicTypeCasts.push(path)
        }
    },

    'ClassDeclaration|FunctionDeclaration'(
        path,
        {t, detectDepIndexByNodeSuperClass, onlyExports, parentPaths, exportNames}
    ) {
        const node = path.node
        const parent = path.parent
        const ref = node.id
        if (onlyExports && !exportNames.has(ref.name)) {
            return
        }
        const isInsertAfter = parent.type === 'ExportNamedDeclaration'
            || parent.type === 'ExportDefaultDeclaration'

        let params

        if (!isInsertAfter && parent.type !== 'Program') {
            return
        }

        if (node.type === 'ClassDeclaration') {
            if (node.superTypeParameters && node.superClass) {
                const sc = node.superClass
                const depExtractIndex = detectDepIndexByNodeSuperClass(
                    sc.name || sc.object.name
                )
                if (depExtractIndex !== null) {
                    const np = node.superTypeParameters.params
                    if (np && np.length > depExtractIndex) {
                        const typedId = path.scope.generateUidIdentifier('deps')
                        typedId.typeAnnotation = np[depExtractIndex]
                        params = [t.typeAnnotation(typedId)]
                    }
                }
            }

            if (!params) {
                const body = node.body.body
                for (let i = 0; i < body.length; i++) {
                    const bodyNode = body[i]
                    if (
                        bodyNode.type === 'ClassMethod'
                        && bodyNode.kind === 'constructor'
                    ) {
                        params = bodyNode.params
                        break
                    } else if (bodyNode.type === 'ClassProperty') {
                        // @todo parameters from props
                    }
                }
            }
        } else {
            params = node.params
        }

        if (params) {
            parentPaths.push([
                isInsertAfter ? path.parentPath : path,
                params,
                ref,
                node.type
            ])
        }
    }
}

export default addReflections
