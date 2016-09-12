export default function createTypeForAnnotations(
    typeForAnnotation
) {
    return function typeForAnnotations(types, typeParameters) {
        const result = []
        for (let i = 0, l = types.length; i < l; i++) {
            const type = types[i]
            const typeAnnotation = type.typeAnnotation && type.typeAnnotation.typeAnnotation
            const id = typeForAnnotation(typeAnnotation, typeParameters)
            if (id) {
                result.push(id)
            }
        }
        return result
    }
}
