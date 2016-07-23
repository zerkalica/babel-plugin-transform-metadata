export default function createInjectParamTypes(
    t,
    reflectId,
    typeForAnnotations,
    paramKey,
    typeKey
) {
    const metaDataId = t.memberExpression(
        reflectId || t.identifier('Reflect'),
        t.identifier('defineMetadata')
    )

    return function defineMetadata(types, target, type) {
        const body = []
        if (types.length) {
            const typeArgs = typeForAnnotations(types)
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

        if (type === 'FunctionDeclaration') {
            body.push(
                t.expressionStatement(t.callExpression(
                    metaDataId,
                    [t.stringLiteral(typeKey), t.booleanLiteral(true), target]
                ))
            )
        }

        return body
    }
}
