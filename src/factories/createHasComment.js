export default function createHasComment(argComment) {
    return function hasComment(type, isTrailing: boolean = false) {
        const comments = isTrailing ? type.trailingComments : type.leadingComments
        if (comments && comments.length > 0) {
            const comment = (comments[0].value || '').trim()
            if (comment === argComment) {
                return true
            }
        }

        return false
    }
}
