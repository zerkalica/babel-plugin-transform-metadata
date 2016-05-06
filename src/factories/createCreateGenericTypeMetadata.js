import generate from 'babel-generator'

const TAG = '[babel-plugin-transform-metadata]'

export default function createCreateGenericTypeMetadata(t, interfaceArgs) {
    return function createGenericTypeMetadata(annotation) {
        if (annotation.typeParameters) {
            const genericCode = generate(annotation).code
            const plainCode = generate(annotation.id).code
            /* eslint-disable no-console */
            console.warn(
            `${TAG} Generic type is not supported: ${genericCode} Just use: ${plainCode}`
            )
        }
        let id = annotation.id
        const imported = interfaceArgs.get(id.name)
        if (imported) {
            id = t.stringLiteral(imported)
        }
        return id
    }
}
