
export default function createDetectDepIndexByNodeSuperClass(
    imports: Map<string, Object>,
    depsPositions
) {
    return function detectDepIndexByNodeSuperClass(name: string): ?number {
        let result: ?number = null
        const rec = imports.get(name)
        if (rec) {
            for (let i = 0; i < depsPositions.length; i++) {
                const dp = depsPositions[i]
                if (dp.import === rec.source && rec.importedName.match(dp.name)) {
                    result = dp.pos
                    break
                }
            }
        }
        return result
    }
}
