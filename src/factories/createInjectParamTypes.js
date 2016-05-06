export default function createInjectParamTypes(t, injectId, typeForAnnotations) {
    return function defineMetadata(types, target) {
        return t.expressionStatement(t.callExpression(
            injectId,
            [t.arrayExpression(typeForAnnotations(types)), target]
        ))
    }
}
