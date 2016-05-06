const addReflections = {
    TypeCastExpression(path, {magicTypeCasts, magicTypeCastExpression}) {
        if (path.node.expression.name === magicTypeCastExpression) {
            magicTypeCasts.push(path)
        }
    },

    'ClassDeclaration|FunctionDeclaration'(path, {parentPaths}) {
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
                parentPaths.push([path.parentPath, params, ref])
            }
        }
    }
}

export default addReflections
