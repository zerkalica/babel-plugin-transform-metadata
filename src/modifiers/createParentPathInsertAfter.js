export default function createParentPathInsertAfter(injectParamTypes) {
    return function parentPathInsertAfter([path, params, ref, type]) {
        injectParamTypes(params, ref, type, path).forEach((node) =>
            path.insertAfter(node)
        )
    }
}
