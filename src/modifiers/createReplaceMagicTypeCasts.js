export default function createReplaceMagicTypeCasts(t, externalTypeNames) {
    return function replaceMagicTypeCasts(path) {
        const node = path.node
        const typeAnnotation = node.typeAnnotation && node.typeAnnotation.typeAnnotation
        const id = typeAnnotation.id
        const name = externalTypeNames.get(id.name)
        if (name) {
            path.replaceWith(t.stringLiteral(name))
        }
    }
}
