export default function createCreateCreateGenericTypeMetadata(
    t,
    externalTypeNames,
    internalTypes,
    reservedGenerics
) {
    return function createCreateGenericTypeMetadata(createObjectTypeMetadata) {
        return function createGenericTypeMetadata(annotation) {
            let id = annotation.id
            if (reservedGenerics.has(id.name)) {
                return createGenericTypeMetadata(annotation.typeParameters.params[0])
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
