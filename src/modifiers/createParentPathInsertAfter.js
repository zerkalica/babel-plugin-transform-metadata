export default function createParentPathInsertAfter(injectParamTypes) {
    return function parentPathInsertAfter([path, params, ref, node]) {
        injectParamTypes(params, ref, node).forEach((newNode) =>
            path.insertAfter(newNode)
        )
    }
}
