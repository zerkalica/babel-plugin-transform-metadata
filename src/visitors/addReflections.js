const addReflections = {
    TypeCastExpression(path, {magicTypeCasts, magicTypeCastExpression}) {
        if (path.node.expression.name === magicTypeCastExpression) {
            magicTypeCasts.push(path)
        }
    },
    'ClassDeclaration|FunctionDeclaration|FunctionExpression|ArrowFunctionExpression'(
        path,
        {onlyExports, parentPaths, exportNames}
    ) {
        const node = path.node
        const parent = path.parent
        let ref
        let insertPath
        switch (parent.type) {
            case 'ExportDefaultDeclaration':
            case 'ExportNamedDeclaration':
                insertPath = path.parentPath
                ref = node.id
                break
            case 'VariableDeclarator':
                insertPath = path.parentPath.parentPath
                ref = parent.id
                break
            case 'Program':
                insertPath = path
                ref = node.id
                break
            default:
                ref = null
                insertPath = null
        }

        if (!insertPath) {
            return
        }
        if (onlyExports && !exportNames.has(ref.name)) {
            return
        }

        let params
        if (node.type === 'ClassDeclaration') {
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
        } else {
            params = node.params
        }

        // if (params)
        {
            parentPaths.push([
                insertPath,
                params,
                ref,
                node
            ])
        }
    }
}

export default addReflections
