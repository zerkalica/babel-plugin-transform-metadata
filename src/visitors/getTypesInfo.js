const getTypesInfo = {
    ImportDeclaration(path, state) {
        /* eslint-disable no-param-reassign */
        const node = path.node
        const strPath = node.source.value
        if (strPath === state.ambiantTypeCastImport) {
            state.ambiantTypeCast = path
        }
    },

    JSXElement(path, state) {
        if (path.parent.type === 'JSXElement') {
            return
        }
        let scope = path.scope
        let funcPath
        do {
            scope = scope.getFunctionParent()
            if (scope.path.isProgram()) {
                break
            }
            funcPath = scope.path
            scope = scope.parent
        } while (scope)
        if (funcPath) {
            state.functionsWithJsx.add(funcPath.node)
        }
    },

    'ImportSpecifier|ImportDefaultSpecifier'(path, state) {
        const node = path.node
        const parent = path.parent
        const importedName = node.type === 'ImportDefaultSpecifier'
            ? node.local.name
            : node.imported.name
        if (parent.importKind !== 'type') {
            return
        }

        const token = state.getUniqueTypeName(parent.source.value, importedName)

        state.externalTypeNames.set(node.local.name, token)
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

    'TypeParameter'(path, state) {
        const node = path.node
        state.externalTypeNames.set(
            node.name,
            null
        )
    },
    'TypeAlias|InterfaceDeclaration'(path, state) {
        const node = path.node
        const parent = path.parent
        if (parent.type !== 'ExportNamedDeclaration') {
            state.internalTypes.set(
                node.id.name,
                node.type === 'TypeAlias'
                    ? node.right
                    : node.body
                )
            return
        }
        const token = state.getUniqueTypeName('', node.id.name)

        state.externalTypeNames.set(node.id.name, token)
    }
}

export default getTypesInfo
