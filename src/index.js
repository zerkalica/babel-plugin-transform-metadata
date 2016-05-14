import getTypesInfo from './visitors/getTypesInfo'
import addReflections from './visitors/addReflections'

import createTypeForAnnotation from './factories/createTypeForAnnotation'
import createCreateCreateGenericTypeMetadata from
    './factories/createCreateCreateGenericTypeMetadata'
import createCreateCreateObjectTypeMetadata from './factories/createCreateCreateObjectTypeMetadata'
import createTypeForAnnotations from './factories/createTypeForAnnotations'
import createHasComment from './factories/createHasComment'
import createGetUniqueTypeName from './factories/createGetUniqueTypeName'

import createParentPathInsertAfter from './modifiers/createParentPathInsertAfter'
import createReplaceMagicTypeCasts from './modifiers/createReplaceMagicTypeCasts'

import createInjectorDeclaration from './metaCreators/createInjectorDeclaration'
import createInjectParamTypes from './metaCreators/createInjectParamTypes'

export default function babelPluginTransformMetadata({types: t}) {
    return {
        visitor: {
            Program(path, {file, opts}) {
                const getUniqueTypeName = createGetUniqueTypeName(
                    opts.typeNameStrategy || 'fullPath'
                )
                const state = {
                    getUniqueTypeName,
                    driverImport: opts.driverImport,
                    ambiantTypeCastImport:
                        opts.ambiantTypeCastImport || 'babel-plugin-transform-metadata/_',
                    ambiantDepsImport:
                        opts.ambiantDepsImport || 'babel-plugin-transform-metadata/Deps',

                    lastImportPath: null,
                    depsId: null,
                    injectId: null,
                    ambiantTypeCast: null,
                    externalClassNames: new Map(),
                    internalTypes: new Map(),
                    externalTypeNames: new Map(),
                    exportNames: new Map()
                }
                state.externalTypeNames.delete(state.depsId)
                path.traverse(getTypesInfo, state)

                const replaceMagicTypeCasts = createReplaceMagicTypeCasts(
                    t,
                    state.externalTypeNames
                )
                const hasComment = createHasComment(opts.argComment || '@args')
                const createCreateObjectTypeMetadata = createCreateCreateObjectTypeMetadata(
                    t,
                    hasComment,
                    state.depsId
                )
                const createCreateGenericTypeMetadata = createCreateCreateGenericTypeMetadata(
                    t,
                    state.externalTypeNames,
                    state.internalTypes,
                    state.depsId,
                    state.externalClassNames
                )
                const typeForAnnotation = createTypeForAnnotation(
                    t,
                    state.externalTypeNames,
                    createCreateObjectTypeMetadata,
                    createCreateGenericTypeMetadata
                )
                const typeForAnnotations = createTypeForAnnotations(
                    hasComment,
                    typeForAnnotation,
                    state.depsId
                )

                const injectId = state.injectId || file.scope.generateUidIdentifier('inject')

                let injectorDeclaration = null
                if (opts.metaDriver !== 'import' || !state.injectId) {
                    injectorDeclaration = createInjectorDeclaration(
                        t,
                        opts.driverImport,
                        opts.metaDriver || 'symbol',
                        injectId,
                        'design:paramtypes'
                    )
                }

                const defineParamTypes = createInjectParamTypes(t, injectId, typeForAnnotations)

                const parentPathInsertAfter = createParentPathInsertAfter(defineParamTypes)

                const reflectionState = {
                    magicTypeCasts: [],
                    parentPaths: [],
                    exportNames: state.exportNames,
                    magicTypeCastExpression: state.ambiantTypeCast
                        ? state.ambiantTypeCast.node.specifiers[0].local.name
                        : ''
                }

                path.traverse(addReflections, reflectionState)

                reflectionState.magicTypeCasts.forEach(replaceMagicTypeCasts)
                reflectionState.parentPaths.forEach(parentPathInsertAfter)
                if (state.ambiantTypeCast) {
                    state.ambiantTypeCast.remove()
                }
                if (injectorDeclaration) {
                    if (state.lastImportPath) {
                        state.lastImportPath.insertAfter(injectorDeclaration)
                    } else {
                        path.node.body.unshift(injectorDeclaration)
                    }
                }
            }
        }
    }
}
