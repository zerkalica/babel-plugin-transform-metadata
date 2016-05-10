import generate from 'babel-generator'

const TAG = '[babel-plugin-transform-metadata]'

export default function createCreateCreateGenericTypeMetadata(
    t,
    externalTypeNames,
    internalTypes,
    depsId,
    externalClassNames
) {
    return function createCreateGenericTypeMetadata(createObjectTypeMetadata) {
        return function createGenericTypeMetadata(annotation) {
            let id = annotation.id
            if (id.name === depsId) {
                return createObjectTypeMetadata(annotation.typeParameters.params[0])
            }
            if (!externalClassNames.has(id.name)) {
                // console.log(externalClassNames)
                return t.stringLiteral(id.name)
                // return createObjectTypeMetadata(internalType)
                // throw new Error(`Unknown type detected: ${generate(annotation).code}`)
            }

            if (annotation.typeParameters) {
                const genericCode = generate(annotation).code
                const plainCode = generate(annotation.id).code
                /* eslint-disable no-console */
                console.warn(
                `${TAG} Generic type is not supported: ${genericCode} Just use: ${plainCode}`
                )
            }
            const internalType = internalTypes.get(id.name)
            if (internalType) {
                return createObjectTypeMetadata(internalType)
            }
            const imported = externalTypeNames.get(id.name)
            if (imported) {
                id = t.stringLiteral(imported)
            }
            return id
        }
    }
}
