export default function createTypeForAnnotations(hasComment, typeForAnnotation) {
    return function typeForAnnotations(types) {
        const result = []
        for (let i = 0, l = types.length; i < l; i++) {
            const type = types[i]
            const typeAnnotation = type.typeAnnotation && type.typeAnnotation.typeAnnotation
            const id = typeForAnnotation(typeAnnotation)
            if (hasComment(type)) {
                break
            }
            if (id) {
                result.push(id)
            }
        }
        return result
    }
}
