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
        state.externalTypeNames.set(node.local.name, node.imported.name)
    },
    ExportSpecifier(path, state) {
        const node = path.node
        state.exportNames.set(node.local.name, node.exported.name)
    },
    'ExportNamedDeclaration|ExportDefaultDeclaration'(path, state) {
        const node = path.node
        const declaration = node.declaration
        if (declaration) {
            const id = declaration.id || declaration
            state.exportNames.set(id.name, id.name)
        }
    },
    TypeAlias(path, state) {
        const node = path.node
        const parent = path.parent
        if (parent.type !== 'ExportNamedDeclaration') {
            state.internalTypes.set(node.id.name, node.right)
            return
        }
        state.externalTypeNames.set(node.id.name, node.id.name)
    }
}

export default getTypesInfo
