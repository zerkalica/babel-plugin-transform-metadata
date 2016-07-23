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
        } else {
            state.lastImportPath = path
        }
    },

    'VariableDeclaration'(path, state) {
        const node = path.node
        const decls = node.declarations[0]
        state.externalClassNames.set(decls.id.name, decls.id.name)
    },

    'ClassDeclaration|FunctionDeclaration'(path, state) {
        const node = path.node
        if (path.parent.type !== 'Program') {
            return
        }

        if (node.type === 'FunctionDeclaration') {
            state.rootFunctions.push(path)
        }
        state.externalClassNames.set(node.id.name, node.id.name)
    },

    'ImportSpecifier|ImportDefaultSpecifier'(path, state) {
        const node = path.node
        const parent = path.parent
        const importedName = node.type === 'ImportDefaultSpecifier'
            ? node.local.name
            : node.imported.name

        state.externalClassNames.set(node.local.name, importedName)
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

    'TypeAlias|InterfaceDeclaration'(path, state) {
        const node = path.node
        const parent = path.parent
        state.externalClassNames.set(node.id.name, node.id.name)
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
