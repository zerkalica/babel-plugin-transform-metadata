/* eslint-env mocha */

import fs from 'fs'
import {transform} from 'babel-core'
import path from 'path'
import assert from 'power-assert'

const exampleFile = fs.readFileSync(
    path.join(__dirname, 'data', 'Example.js')
).toString()

const exampleTranspiledFileName = path.join(__dirname, 'data', 'ExampleTranspiled.js')

const pluginPath = path.join(__dirname, '..', '..', 'dist', 'index.js')

const babelConfig = {
    plugins: [
        'syntax-flow',
        'syntax-decorators',
        [pluginPath, {
            reflectImport: 'reactive-di/inject'
        }]
    ]
}

describe('transformTest', () => {
    it('test successful for Example', () => {
        const {code} = transform(exampleFile, babelConfig)
        // console.log(code)
        // fs.writeFileSync(exampleTranspiledFileName, code)
        const exampleTranspiledFile = fs.readFileSync(exampleTranspiledFileName).toString()
        assert(code === exampleTranspiledFile)
    })
})
