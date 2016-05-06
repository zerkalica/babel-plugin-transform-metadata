const getTypesInfo = {
    ImportDeclaration(path, state) {
        /* eslint-disable no-param-reassign */
        const node = path.node
        const strPath = node.source.value
        if (strPath === state.reflectImport) {
            state.injectId = node.specifiers[0].local
        }
        if (strPath === state.ambiantTypeCastImport) {
            state.ambiantTypeCast = path
        }
    },
    ImportSpecifier(path, state) {
        const node = path.node
        const parent = path.parent
        if (parent.importKind !== 'type') {
            return
        }
        state.interfaceArgs.set(node.local.name, node.imported.name)
    },
    TypeAlias(path, state) {
        const node = path.node
        const parent = path.parent
        if (parent.type !== 'ExportNamedDeclaration') {
            return
        }
        state.interfaceArgs.set(node.id.name, node.id.name)
    }
}

export default getTypesInfo
