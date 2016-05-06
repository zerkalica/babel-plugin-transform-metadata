export default function createReplaceMagicTypeCasts(t, interfaceArgs) {
    return function replaceMagicTypeCasts(path) {
        const node = path.node
        const typeAnnotation = node.typeAnnotation && node.typeAnnotation.typeAnnotation
        const id = typeAnnotation.id
        const name = interfaceArgs.get(id.name)
        if (name) {
            path.replaceWith(t.stringLiteral(name))
        }
    }
}
