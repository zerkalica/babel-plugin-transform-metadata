export default function createCreateCreateGenericTypeMetadata(
    t,
    externalTypeNames,
    internalTypes,
    markGenerics
) {
    const propName = t.identifier('v')
    const sigName = t.identifier('_r4')

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
            const tp = annotation.typeParameters
            if (tp
                && tp.params
                && tp.params.length
            ) {
                const param = tp.params[0]
                let result

                switch (param.type) {
                    case 'TypeofTypeAnnotation':
                    case 'GenericTypeAnnotation':
                        result = createGenericTypeMetadata(param)
                        break
                    case 'UnionTypeAnnotation':
                        result = param.types.map((par) => createGenericTypeMetadata(par))
                        break
                    default:
                        result = null
                }

                if (result) {
                    const interfaceId = markGenerics[id.name]
                    return interfaceId
                        ? t.objectExpression([
                            t.objectProperty(sigName, t.numericLiteral(interfaceId)),
                            t.objectProperty(propName, t.arrayExpression(
                                Array.isArray(result) ? result : [result]
                            ))
                        ])
                        : result
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
