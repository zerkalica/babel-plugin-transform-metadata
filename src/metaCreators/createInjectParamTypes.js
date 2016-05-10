export default function createInjectParamTypes(t, fnId, typeForAnnotations) {
    return function defineMetadata(types, target) {
        return t.expressionStatement(t.callExpression(
            fnId,
            [t.arrayExpression(typeForAnnotations(types)), target]
        ))
    }
}
