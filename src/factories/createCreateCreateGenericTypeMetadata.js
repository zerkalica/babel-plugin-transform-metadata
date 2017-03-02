export default function createCreateCreateGenericTypeMetadata(
    t,
    externalTypeNames,
    internalTypes
) {
    return function createCreateGenericTypeMetadata(createObjectTypeMetadata) {
        return function createGenericTypeMetadata(annotation, typeParameters) {
            if (annotation.type === 'TypeofTypeAnnotation') {
                return createGenericTypeMetadata(annotation.argument)
            }

            let id = annotation.id

            if (typeParameters) {
                for (let i = 0; i < typeParameters.length; i++) {
                    if (typeParameters[i].name === id.name) {
                        return t.stringLiteral(id.name)
                    }
                }
            }
            if (annotation.typeParameters
                && annotation.typeParameters.params
            ) {
                const param = annotation.typeParameters.params[0]
                if (param && (param.id || param.type === 'TypeofTypeAnnotation')) {
                    return createGenericTypeMetadata(param)
                }
            }
            const internalType = internalTypes.get(id.name)
            if (internalType) {
                return createObjectTypeMetadata(internalType)
            }
            if (externalTypeNames.has(id.name)) {
                const imported = externalTypeNames.get(id.name)

                return imported ? t.stringLiteral(imported) : t.nullLiteral()
            }

            return id
        }
    }
}
