export default function createTypeForAnnotations(
    hasComment,
    typeForAnnotation,
    depsId
) {
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
            // console.log(typeAnnotation.id)
            if (typeAnnotation.id && typeAnnotation.id.name === depsId) {
                break
            }
        }
        return result
    }
}
