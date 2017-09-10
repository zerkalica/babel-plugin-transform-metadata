import {basename} from 'path'

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

const defaults = {
    typeNameStrategy: 'typeName',
    markGenerics: {'ISource': 1, 'IStatus': 2},
    onlyExports: false,
    addFileName: false,
    addDisplayName: false,
    injectPrefix: '_r',
    ambiantTypeCastImport: 'babel-plugin-transform-metadata/_',
    ambiantDepsImport: 'babel-plugin-transform-metadata/Deps'
}

export default function babelPluginTransformMetadata({types: t}) {
    let cnf
    return {
        visitor: {
            Program(path, {opts, file}) {
                if (!cnf) {
                    cnf = {...defaults, ...opts}
                }
                const prefix = process ? process.cwd() : ''
                const filename = !cnf.addFileName || file.opts.filename === 'unknown'
                    ? null
                    : basename(prefix) + file.opts.filename.substring(prefix.length)
                const getUniqueTypeName = createGetUniqueTypeName(cnf.typeNameStrategy)
                const state = {
                    getUniqueTypeName,
                    ambiantTypeCastImport: cnf.ambiantTypeCastImport,
                    ambiantDepsImport: cnf.ambiantDepsImport,
                    ambiantTypeCast: null,
                    internalTypes: new Map(),
                    externalTypeNames: new Map(),
                    exportNames: new Map(),
                    functionsWithJsx: new Set()
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
                    cnf.markGenerics
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

                const injectParamTypes = createInjectParamTypes(
                    t,
                    cnf.injectPrefix,
                    typeForAnnotations,
                    state.functionsWithJsx,
                    filename,
                    cnf.addDisplayName
                )
                const parentPathInsertAfter = createParentPathInsertAfter(injectParamTypes)
                const reflectionState = {
                    t,
                    magicTypeCasts: [],
                    parentPaths: [],
                    onlyExports: cnf.onlyExports,
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
            }
        }
    }
}
