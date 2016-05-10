const addReflections = {
    TypeCastExpression(path, {magicTypeCasts, magicTypeCastExpression}) {
        if (path.node.expression.name === magicTypeCastExpression) {
            magicTypeCasts.push(path)
        }
    },

    'ClassDeclaration|FunctionDeclaration'(path, {parentPaths, exportNames}) {
        const node = path.node
        const parent = path.parent
        const ref = node.id
        if (!exportNames.has(ref.name)) {
            return
        }
        const isInsertAfter = parent.type === 'ExportNamedDeclaration'
            || parent.type === 'ExportDefaultDeclaration'

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
            // console.log(params)
        }

        if (params) {
            parentPaths.push([
                isInsertAfter ? path.parentPath : path,
                params,
                ref
            ])
        }
    }
}

export default addReflections
