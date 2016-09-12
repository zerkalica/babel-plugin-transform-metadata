export default function createInjectParamTypes(
    t,
    reflectId,
    typeForAnnotations,
    paramKey,
    typeKey,
    functionsWithJsx
) {
    const metaDataId = t.memberExpression(
        reflectId || t.identifier('Reflect'),
        t.identifier('defineMetadata')
    )
    // console.log(functionsWithJsx)
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
                body.push(t.expressionStatement(t.callExpression(
                    metaDataId,
                    [
                        t.stringLiteral(paramKey),
                        t.arrayExpression(typeArgs),
                        target
                    ]
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
            body.push(
                t.expressionStatement(t.callExpression(
                    metaDataId,
                    [t.stringLiteral(typeKey), t.stringLiteral(isJsx ? 'jsx' : 'func'), target]
                ))
            )
        }

        return body
    }
}
