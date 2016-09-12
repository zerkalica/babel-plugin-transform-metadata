export default function createTypeForAnnotation(
    t,
    externalTypeNames,
    createCreateObjectTypeMetadata,
    createCreateGenericTypeMetadata
) {
    let createGenericTypeMetadata
    let createObjectTypeMetadata

    function typeForAnnotation(annotation, typeParameters) {
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
            case 'TypeofTypeAnnotation':
                return createGenericTypeMetadata(annotation.argument)
            case 'GenericTypeAnnotation':
                return createGenericTypeMetadata(annotation, typeParameters)
            case 'ObjectTypeAnnotation':
                return createObjectTypeMetadata(annotation)
            case 'FunctionTypeAnnotation':
                return t.identifier('Function')
            default:
                return null;
        }
    }
    createObjectTypeMetadata = createCreateObjectTypeMetadata(typeForAnnotation)
    createGenericTypeMetadata = createCreateGenericTypeMetadata(createObjectTypeMetadata)
    return typeForAnnotation
}
