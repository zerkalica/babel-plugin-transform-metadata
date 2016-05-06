export default function createTypeForAnnotation(
    t,
    interfaceArgs,
    createCreateObjectTypeMetadata,
    createGenericTypeMetadata
) {
    let createObjectTypeMetadata

    function typeForAnnotation(annotation) {
        if (!annotation) {
            return null
        }
        switch (annotation.type) {
            case 'StringTypeAnnotation':
                return t.identifier('String');
            case 'NumberTypeAnnotation':
                return t.identifier('Number');
            case 'BooleanTypeAnnotation':
                return t.identifier('Boolean');
            case 'VoidTypeAnnotation':
                return t.unaryExpression('void', t.numericLiteral(0));
            case 'GenericTypeAnnotation':
                return createGenericTypeMetadata(annotation)
            case 'ObjectTypeAnnotation':
                return createObjectTypeMetadata(annotation)
            case 'FunctionTypeAnnotation':
                return t.identifier('Function')
            default:
                return null;
        }
    }
    createObjectTypeMetadata = createCreateObjectTypeMetadata(typeForAnnotation)

    return typeForAnnotation
}
