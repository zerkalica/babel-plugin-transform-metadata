import {crc32} from 'crc'
import {sep, basename} from 'path'

const escapedSep = sep.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')

const IS_RELATIVE = new RegExp('\\.' + escapedSep)

export default function createGetUniqueTypeName(strategy: 'fullPath' | 'typeName') {
    function getUniqueTypeName(pathValue, name) {
        const suffix = IS_RELATIVE.test(pathValue)
            ? basename(pathValue)
            : pathValue

        return name + (suffix ? ('.' + crc32(suffix)) : '')
    }

    function getDefaultUniqueTypeName(pathValue, name) {
        return name
    }

    switch (strategy) {
        case 'fullPath':
            return getUniqueTypeName
        case 'typeName':
            return getDefaultUniqueTypeName
        default:
            return getDefaultUniqueTypeName
    }
}
