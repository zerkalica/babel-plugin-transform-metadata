import getTypesInfo from './visitors/getTypesInfo'
import addReflections from './visitors/addReflections'

import createTypeForAnnotation from './factories/createTypeForAnnotation'
import createCreateCreateGenericTypeMetadata from
    './factories/createCreateCreateGenericTypeMetadata'
import createCreateCreateObjectTypeMetadata from './factories/createCreateCreateObjectTypeMetadata'
import createTypeForAnnotations from './factories/createTypeForAnnotations'
import createGetUniqueTypeName from './factories/createGetUniqueTypeName'

import createParentPathInsertAfter from './modifiers/createParentPathInsertAfter'
import createReplaceMagicTypeCasts from './modifiers/createReplaceMagicTypeCasts'

import createInjectParamTypes from './metaCreators/createInjectParamTypes'

export default function babelPluginTransformMetadata({types: t}) {
    return {
        visitor: {
            Program(path, {opts}) {
                const getUniqueTypeName = createGetUniqueTypeName(
                    opts.typeNameStrategy || 'typeName'
                )
                const state = {
                    getUniqueTypeName,
                    reflectImport: opts.reflectImport,
                    ambiantTypeCastImport:
                        opts.ambiantTypeCastImport || 'babel-plugin-transform-metadata/_',
                    ambiantDepsImport:
                        opts.ambiantDepsImport || 'babel-plugin-transform-metadata/Deps',

                    lastImportPath: null,
                    reservedGenerics: new Set(opts.reservedGenerics || ['Class', 'ResultOf']),
                    injectId: null,
                    ambiantTypeCast: null,
                    externalClassNames: new Map(),
                    internalTypes: new Map(),
                    externalTypeNames: new Map(),
                    exportNames: new Map(),
                    rootFunctions: []
                }
                path.traverse(getTypesInfo, state)
                const replaceMagicTypeCasts = createReplaceMagicTypeCasts(
                    t,
                    state.externalTypeNames
                )
                const createCreateObjectTypeMetadata = createCreateCreateObjectTypeMetadata(
                    t
                )
                const createCreateGenericTypeMetadata = createCreateCreateGenericTypeMetadata(
                    t,
                    state.externalTypeNames,
                    state.internalTypes,
                    state.reservedGenerics,
                    state.externalClassNames
                )
                const typeForAnnotation = createTypeForAnnotation(
                    t,
                    state.externalTypeNames,
                    createCreateObjectTypeMetadata,
                    createCreateGenericTypeMetadata
                )
                const typeForAnnotations = createTypeForAnnotations(
                    typeForAnnotation
                )

                let injectId = state.injectId
                let injectorDeclaration = null
                if (!injectId && opts.reflectImport) {
                    injectId = t.identifier('Driver')
                    injectorDeclaration = t.importDeclaration(
                       [t.importDefaultSpecifier(injectId)],
                       t.stringLiteral(opts.reflectImport)
                   )
                }

                const defineParamTypes = createInjectParamTypes(
                    t,
                    injectId,
                    typeForAnnotations,
                    opts.paramKey || 'design:paramtypes',
                    opts.typeKey || 'design:function'
                )
                const parentPathInsertAfter = createParentPathInsertAfter(defineParamTypes)

                const reflectionState = {
                    magicTypeCasts: [],
                    parentPaths: [],
                    onlyExports: opts.onlyExports || false,
                    exportNames: state.exportNames,
                    magicTypeCastExpression: state.ambiantTypeCast
                        ? state.ambiantTypeCast.node.specifiers[0].local.name
                        : ''
                }

                path.traverse(addReflections, reflectionState)

                reflectionState.magicTypeCasts.forEach(replaceMagicTypeCasts)
                reflectionState.parentPaths.forEach(parentPathInsertAfter)

                if (injectorDeclaration) {
                    if (state.lastImportPath) {
                        state.lastImportPath.insertAfter(injectorDeclaration)
                    } else {
                        path.node.body.unshift(injectorDeclaration)
                    }
                }

                if (state.ambiantTypeCast) {
                    state.ambiantTypeCast.remove()
                }
            }
        }
    }
}
