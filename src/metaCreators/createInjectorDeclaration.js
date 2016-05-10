function createCreateFunctionDeclaration(
    t,
    injectId,
    target,
    params
) {
    return function createFunctionDeclaration(expr) {
        return t.functionDeclaration(
            injectId,
            [params, target],
            t.blockStatement([t.expressionStatement(expr)])
        )
    }
}

export default function createInjectorDeclaration(
    t,
    driverImport,
    driver,
    injectId,
    key
) {
    const target = t.identifier('target')
    target.typeAnnotation = t.typeAnnotation(t.anyTypeAnnotation())
    const params = t.identifier('params')
    const keyId = t.stringLiteral(key)

    const createFunctionDeclaration = createCreateFunctionDeclaration(t, injectId, target, params)

    switch (driver) {
        case 'import':
            return t.importDeclaration(
                [t.importDefaultSpecifier(injectId)],
                t.stringLiteral(driverImport)
            )
        case 'property':
            return createFunctionDeclaration(
                t.assignmentExpression(
                    '=',
                    t.memberExpression(target, keyId, true),
                    params
                )
            )
        case 'symbol':
            return createFunctionDeclaration(t.assignmentExpression(
                '=',
                t.memberExpression(target,
                    t.callExpression(
                        t.memberExpression(t.identifier('Symbol'), t.identifier('for')),
                        [keyId]
                    ),
                    true
                ),
                params
            ))
        case 'reflection':
            return createFunctionDeclaration(t.callExpression(
                t.memberExpression(t.identifier('Reflect'), t.identifier('defineMetadata')),
                [keyId, params, target]
            ))
        default:
            throw new Error('Unknown driver type')
    }
}
