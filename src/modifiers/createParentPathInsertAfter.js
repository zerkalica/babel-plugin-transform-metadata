export default function createParentPathInsertAfter(defineParamTypes) {
    return function parentPathInsertAfter([path, params, ref, type]) {
        defineParamTypes(params, ref, type).forEach((node) =>
            path.insertAfter(node)
        )
    }
}
