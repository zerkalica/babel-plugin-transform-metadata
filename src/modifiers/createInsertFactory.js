
export default function createInsertFactory(t, jsxPragma: stirng) {
    const jsxId = t.identifier(jsxPragma)
    const propsId = t.identifier('props')
    const stateId = t.identifier('state')

    return function insertFactory(node) {
        if (!node.params) {
            return
        }
        const np = node.params
        if (np.length > 2) {
            return
        }
        if (np.length === 0) {
            np.push(propsId)
        }
        if (np.length === 1) {
            np.push(stateId)
        }
        np.push(jsxId)
    }
}
