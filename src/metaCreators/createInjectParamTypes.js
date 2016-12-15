export default function createInjectParamTypes(
    t,
    injectPrefixRaw,
    typeForAnnotations,
    paramKey,
    typeKey,
    functionsWithJsx,
    filename
) {
    const metaDataId = injectPrefixRaw ? null : t.memberExpression(
        t.identifier('Reflect'),
        t.identifier('defineMetadata')
    )
    const injectPrefix = injectPrefix || '_rdi'
    const argId = t.identifier(`${injectPrefix}Arg`)
    const jsxId = t.identifier(`${injectPrefix}Jsx`)
    const fnId = t.identifier(`${injectPrefix}Fn`)
    const debugId = t.identifier(`${injectPrefix}Dbg`)

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
                if (metaDataId) {
                    body.push(t.expressionStatement(t.callExpression(
                        metaDataId,
                        [
                            t.stringLiteral(paramKey),
                            t.arrayExpression(typeArgs),
                            target
                        ]
                    )))
                } else {
                    body.push(t.expressionStatement(t.assignmentExpression(
                        '=',
                        t.memberExpression(target, argId),
                        t.arrayExpression(typeArgs)
                    )))
                }
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
            if (metaDataId) {
                body.push(
                    t.expressionStatement(t.callExpression(
                        metaDataId,
                        [t.stringLiteral(typeKey), t.stringLiteral(isJsx ? 'jsx' : 'func'), target]
                    ))
                )
            } else {
                body.push(t.expressionStatement(t.assignmentExpression(
                    '=',
                    t.memberExpression(target, isJsx ? jsxId : fnId),
                    t.booleanLiteral(true)
                )))
            }
        }

        if (filename) {
            body.push(t.expressionStatement(t.assignmentExpression(
                '=',
                t.memberExpression(target, debugId),
                t.stringLiteral(`${filename}#${target.name}`)
            )))
        }

        return body
    }
}
