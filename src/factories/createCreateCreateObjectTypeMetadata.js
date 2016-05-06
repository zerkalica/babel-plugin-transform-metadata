export default function createCreateCreateObjectTypeMetadata(t, hasComment) {
    return function createCreateObjectTypeMetadata(typeForAnnotation) {
        return function createObjectTypeMetadata(annotation) {
            if (annotation.properties) {
                const props = []
                const properties = annotation.properties
                for (let i = 0, l = properties.length; i < l; i++) {
                    const property = properties[i]
                    const {key, value} = property
                    const val = typeForAnnotation(value)
                    if (val) {
                        props.push(t.objectProperty(
                            t.identifier(key.name),
                            val
                        ))
                    }
                    if (hasComment(property, true)) {
                        break
                    }
                }
                return t.objectExpression(props)
            }
            return t.identifier('Object')
        }
    }
}
