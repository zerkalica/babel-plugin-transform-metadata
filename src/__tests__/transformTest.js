/* eslint-env mocha */

import fs from 'fs'
import {transformFileSync} from 'babel-core'
import path from 'path'
import glob from 'glob'
import assert from 'assert'

const pluginPath = path.join(__dirname, '..', '..', 'dist', 'index.js')

const babelConfig = {
    plugins: [
        'syntax-jsx',
        ['transform-react-jsx', {pragma: 'h'}],
        'transform-decorators-legacy',
        'syntax-flow',
        'syntax-decorators',
        [pluginPath, {
            addDisplayName: true,
            addFileName: true
        }]
    ]
}
const create: boolean = false

describe('transformTest', () => {
    glob.sync(__dirname + '/data/*.js').forEach((inName: string) => {
        const rec = path.parse(inName)
        const outName: string = path.join(__dirname, 'data', 'out', `${rec.name}Out.js`)
        it(rec.name, () => {
            // const inFile = fs.readFileSync(inName).toString()
            const {code} = transformFileSync(inName, babelConfig)
            let outFile: string
            if (create) {
                outFile = code
                fs.writeFileSync(outName, outFile)
            } else {
                outFile = fs.readFileSync(outName).toString()
            }

            assert(code === outFile)
        })
    })
})
