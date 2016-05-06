export default function createReflectionParamTypes(t, key, typeForAnnotations) {
    const callee = t.memberExpression(t.identifier('Reflect'), t.identifier('defineMetadata'))

    return function defineMetadata(types, target) {
        return t.expressionStatement(t.callExpression(
            callee,
            [t.stringLiteral(key), t.arrayExpression(typeForAnnotations(types)), target]
        ))
    }
}
