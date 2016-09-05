
export default function createInsertFactory(t, jsxPragma: stirng) {
    const jsxId = t.identifier(jsxPragma)
    // const stateId = t.identifier('state')
    function getDeclaration(th = t.thisExpression()) {
        return t.variableDeclaration(
            'const',
            [t.variableDeclarator(
                jsxId,
                t.memberExpression(th, jsxId)
            )]
        )
    }
    const fallbackDeclaration = getDeclaration()
    const objPropertyId = t.objectProperty(jsxId, jsxId)

    const paramIndex = 0

    return function insertFactory(node) {
        if (node.params && node.params[paramIndex]) {
            const param = node.params[paramIndex]
            switch (param.type) {
                case 'ObjectPattern':
                    param.properties.push(objPropertyId)
                    return
                case 'Identifier':
                    node.body.body.unshift(getDeclaration(param))
                    return
                default:
                    break
            }
        }
        if (node.type === 'ClassMethod') {
            node.body.body.unshift(fallbackDeclaration)
        }
    }
}
