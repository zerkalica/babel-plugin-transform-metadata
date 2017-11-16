export default function createInjectParamTypes(
    t,
    injectPrefixRaw,
    typeForAnnotations,
    functionsWithJsx,
    filename,
    addDisplayName
) {
    const injectPrefix = t.identifier(injectPrefixRaw || '_r')
    const displayNameId = t.identifier('displayName')

    return function injectParamTypes(rawTypes, target, node) {
        const body = []
        const type = node.type
        const isJsx = functionsWithJsx.has(node)
        const meta = []

        let typeArgs = []
        if (rawTypes && rawTypes.length) {
            let types
            if (isJsx) {
                types = rawTypes.slice(1)
            } else {
                types = rawTypes
            }

            typeArgs = typeForAnnotations(
                types,
                node.typeParameters ? node.typeParameters.params : null
            )
        }

        const isFunction = type === 'FunctionDeclaration'
            || type === 'FunctionExpression'
            || type === 'ArrowFunctionExpression'

        if (typeArgs.length) {
            meta.push(t.numericLiteral(isJsx ? 1 : (isFunction ? 2 : 0)))
            meta.push(t.arrayExpression(typeArgs))
        } else if (isFunction) {
            meta.push(t.numericLiteral(isJsx ? 1 : 2))
        }

        if (addDisplayName) {
            body.push(t.expressionStatement(t.assignmentExpression(
                '=',
                t.memberExpression(target, displayNameId),
                t.stringLiteral(filename ? (filename + '#' + target.name) : target.name)
            )))
        }

        if (meta.length) {
            body.push(t.expressionStatement(t.assignmentExpression(
                '=',
                t.memberExpression(target, injectPrefix),
                t.arrayExpression(meta)
            )))
        }


        return body
    }
}
