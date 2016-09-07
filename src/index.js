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
    reflectImport: null,
    typeNameStrategy: 'typeName',
    paramKey: 'design:paramtypes',
    typeKey: 'design:subtype',
    onlyExports: false,
    ambiantTypeCastImport: 'babel-plugin-transform-metadata/_',
    ambiantDepsImport: 'babel-plugin-transform-metadata/Deps',
    reservedGenerics: ['Class', 'ResultOf'],
    jsxPragma: '__h'
}

export default function babelPluginTransformMetadata({types: t}) {
    let cnf
    return {
        visitor: {
            Program(path, {opts}) {
                if (!cnf) {
                    cnf = {...defaults, ...opts}
                }
                const getUniqueTypeName = createGetUniqueTypeName(cnf.typeNameStrategy)
                const state = {
                    getUniqueTypeName,
                    reflectImport: cnf.reflectImport,
                    ambiantTypeCastImport: cnf.ambiantTypeCastImport,
                    ambiantDepsImport: cnf.ambiantDepsImport,

                    lastImportPath: null,
                    reservedGenerics: new Set(cnf.reservedGenerics),
                    injectId: null,
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
                    state.reservedGenerics
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
                if (!injectId && cnf.reflectImport) {
                    injectId = t.identifier('Driver')
                    injectorDeclaration = t.importDeclaration(
                       [t.importDefaultSpecifier(injectId)],
                       t.stringLiteral(cnf.reflectImport)
                   )
                }

                const injectParamTypes = createInjectParamTypes(
                    t,
                    injectId,
                    typeForAnnotations,
                    cnf.paramKey,
                    cnf.typeKey,
                    state.functionsWithJsx
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
