export default function createInjectParamTypes(
    t,
    injectPrefixRaw,
    typeForAnnotations,
    functionsWithJsx,
    filename,
    addDisplayName
) {
    const injectPrefix = injectPrefixRaw || '_r'
    const argId = t.identifier(`${injectPrefix}1`)
    const flagsId = t.identifier(`${injectPrefix}2`)
    const fileId = t.identifier(`${injectPrefix}3`)
    const displayNameId = t.identifier('displayName')

    return function injectParamTypes(rawTypes, target, node) {
        const body = []
        const type = node.type
        const isJsx = functionsWithJsx.has(node)

        if (rawTypes.length) {
            let types
            if (isJsx) {
                types = rawTypes.length > 1 ? [rawTypes[1]] : []
            } else {
                types = rawTypes
            }
            const typeArgs = typeForAnnotations(
                types,
                node.typeParameters ? node.typeParameters.params : null
            )
            if (typeArgs.length) {
                body.push(t.expressionStatement(t.assignmentExpression(
                    '=',
                    t.memberExpression(target, argId),
                    t.arrayExpression(typeArgs)
                )))
            }

            for (let i = 0; i < types.length; i++) {
                const argType = types[i]
                const decorators = argType.decorators || []
                for (let j = 0; j < decorators.length; j++) {
                    body.push(t.expressionStatement(t.callExpression(
                        decorators[j].expression,
                        [
                            target,
                            t.identifier('null'),
                            t.identifier(i.toString())
                        ]
                    )))
                }
            }
        }

        if (
            type === 'FunctionDeclaration'
            || type === 'FunctionExpression'
            || type === 'ArrowFunctionExpression'
        ) {
            body.push(t.expressionStatement(t.assignmentExpression(
                '=',
                t.memberExpression(target, flagsId),
                t.numericLiteral(isJsx ? 1 : 2)
            )))
        }

        if (filename) {
            body.push(t.expressionStatement(t.assignmentExpression(
                '=',
                t.memberExpression(target, fileId),
                t.stringLiteral(filename)
            )))
        }

        if (addDisplayName) {
            body.push(t.expressionStatement(t.assignmentExpression(
                '=',
                t.memberExpression(target, displayNameId),
                t.stringLiteral(target.name)
            )))
        }

        return body
    }
}
