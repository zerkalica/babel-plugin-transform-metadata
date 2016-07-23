// import generate from 'babel-generator'

export default function createCreateCreateObjectTypeMetadata(t) {
    return function createCreateObjectTypeMetadata(typeForAnnotation) {
        return function createObjectTypeMetadata(annotation) {
            let properties = annotation.properties
            const types = annotation.types

            if (!properties && types && types.length) {
                properties = types[types.length - 1].properties
            }
            if (properties) {
                const props = []

                for (let i = 0, l = properties.length; i < l; i++) {
                    const property = properties[i]
                    const {key, value} = property
                    if (!key || !value) {
                        break
                    }

                    const val = typeForAnnotation(value)
                    if (val) {
                        props.push(t.objectProperty(
                            t.identifier(key.name),
                            val
                        ))
                    }
                }
                return t.objectExpression(props)
            }
            return t.identifier('Object')
        }
    }
}
