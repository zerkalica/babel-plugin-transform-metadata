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
import createInsertFactory from './modifiers/createInsertFactory'

const defaults = {
    typeNameStrategy: 'typeName',
    paramKey: 'design:paramtypes',
    typeKey: 'design:subtype',
    allowedGenerics: ['ResultOf'],
    onlyExports: false,
    addDebugId: false,
    injectPrefix: '_rdi',
    ambiantTypeCastImport: 'babel-plugin-transform-metadata/_',
    ambiantDepsImport: 'babel-plugin-transform-metadata/Deps',
    jsxPragma: '_t'
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
                const filename = !cnf.addDebugId || file.opts.filename === 'unknown'
                    ? null
                    : basename(prefix) + file.opts.filename.substring(prefix.length)
                const getUniqueTypeName = createGetUniqueTypeName(cnf.typeNameStrategy)
                const state = {
                    getUniqueTypeName,
                    ambiantTypeCastImport: cnf.ambiantTypeCastImport,
                    ambiantDepsImport: cnf.ambiantDepsImport,

                    ambiantTypeCast: null,
                    allowedGenerics: new Set(cnf.allowedGenerics),
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
                    state.allowedGenerics
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
                    cnf.paramKey,
                    cnf.typeKey,
                    state.functionsWithJsx,
                    filename
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
                if (cnf.jsxPragma) {
                    state.functionsWithJsx.forEach(createInsertFactory(t, cnf.jsxPragma))
                }

                if (state.ambiantTypeCast) {
                    state.ambiantTypeCast.remove()
                }
            }
        }
    }
}
