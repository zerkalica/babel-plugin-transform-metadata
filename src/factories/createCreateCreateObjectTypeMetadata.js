// import generate from 'babel-generator'

export default function createCreateCreateObjectTypeMetadata(t, hasComment, depsId) {
    function isDepsId(prop): boolean {
        if (!prop.value || !prop.value.id) {
            // throw new Error(`isDepsId: not found value property in ${generate(prop).code}`)
            return false
        }
        return prop.value.id.name === depsId
    }

    return function createCreateObjectTypeMetadata(typeForAnnotation) {
        return function createObjectTypeMetadata(annotation) {
            if (annotation.properties) {
                const props = []
                const properties = annotation.properties
                const pr = properties.find(isDepsId)
                if (pr) {
                    if (pr.value.typeParameters) {
                        return typeForAnnotation(pr.value.typeParameters.params[0])
                    }
                }

                for (let i = 0, l = properties.length; i < l; i++) {
                    const property = properties[i]
                    const {key, value} = property
                    if (!key || !value) {
//     throw new Error(
// `createObjectTypeMetadata: Not found value property in ${generate(property).code}`
//     )
                        break
                    }
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
