export default function createParentPathInsertAfter(defineParamTypes) {
    return function parentPathInsertAfter([path, params, ref]) {
        path.insertAfter(defineParamTypes(params, ref))
    }
}
