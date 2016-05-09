import generate from 'babel-generator'

const TAG = '[babel-plugin-transform-metadata]'

export default function createCreateCreateGenericTypeMetadata(
    t,
    externalTypeNames,
    internalTypes,
    depsId
) {
    return function createCreateGenericTypeMetadata(createObjectTypeMetadata) {
        return function createGenericTypeMetadata(annotation) {
            let id = annotation.id
            if (id.name === depsId) {
                return createObjectTypeMetadata(annotation.typeParameters.params[0])
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
