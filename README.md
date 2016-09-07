# babel-plugin-transform-metadata

Strict and smart reflection metadata generator for classes and functions from [flowtype](https://flowtype.org) metadata.

-   Supports arrows and function expressions
-   Can use custom Reflection polyfill
-   Metadata provided for array and object-style arguments
-   Functions marked as 'design:function'
-   With transform-decorators-legacy supports argument decorators
-   Adds createElement as third argument to each function with jsx, used in [reactive-di](https://github.com/zerkalica/reactive-di) components: (props, state, h) => React$Element

flowtype and [typescript](https://www.typescriptlang.org/) reflection does not support type annotations as value keys, so we use some trick with typecast.

```js
// @flow
import _ from 'babel-plugin-transform-metadata/_'
const id = (_: IT)
```

converted to:

```js
// @flow
const id = 'IT'
```

## Example

```js
// @flow
import type {IT} from './imports/ITest'

import _ from 'babel-plugin-transform-metadata/_'

import {Component as ReactComponent} from 'react'

class B<V> {}
const f: number = 123

interface Internal<V> {
    s: string;
    b: B<V>;
}

class A {
    constructor(
        @dec1 b: B<*>,
        @dec2({k: 'test'}) e: IT,
        i: Internal<*>,
        some: typeof f
    ) {}
}

interface State {s: number}
function ComponentD(rec: {p: number}, state: State) {
    return <div>AA</div>
}

function factory(): () => void {
    return () => {}
}

type ResultOf<F> = _ResultOf<*, F>
type _ResultOf<V, F: (...x: any[]) => V> = V

function fn(a: A, b: Class<B>, f: ResultOf<factory>) {
    function fn2(a: A) {
    }
}

const id = (_: IT)
```

Transpiled to:

```js
// @flow
import type { IT } from './imports/ITest';

import { Component as ReactComponent } from 'react';

let B = class B<V> {};

const f: number = 123;

interface Internal<V> {
    s: string;
    b: B<V>;
}

let A = class A {
    constructor(b: B<*>, e: IT, i: Internal<*>, some: typeof f) {}
};
dec2({ k: 'test' })(A, null, 1);
dec1(A, null, 0);
Reflect.defineMetadata('design:paramtypes', [B, 'IT', {
    s: String,
    b: B
}, f], A);


interface State { s: number }
function ComponentD(rec: { p: number }, state: State, __h) {
    return <div>AA</div>;
}

Reflect.defineMetadata('design:subtype', 'jsx', ComponentD);
Reflect.defineMetadata('design:paramtypes', [{
    s: Number
}], ComponentD);
function factory(): () => void {
    return () => {};
}

Reflect.defineMetadata('design:subtype', 'func', factory);
type ResultOf<F> = _ResultOf<*, F>;
type _ResultOf<V, F: (...x: any[]) => V> = V;

function fn(a: A, b: Class<B>, f: ResultOf<factory>) {
    function fn2(a: A) {}
}

Reflect.defineMetadata('design:subtype', 'func', fn);
Reflect.defineMetadata('design:paramtypes', [A, B, factory], fn);
const id = 'IT';
```

## .babelrc options

Add before babel-plugin-transform-decorators-legacy and other transformation plugins.
-   reservedGenerics: string[] - first arguments of this generics treated as dependency, default is ['Class', 'ResultOf']
-   onlyExports: boolean - if true - add metadata only to exported function/classes
-   reflectImport: ?string - Path to import custom reflection polyfill.
-   typeNameStrategy: 'fullPath' | 'typeName' - how to generate interface name tokens: fullPath - type name + crc(file with type path), typeName - type name only.
-   jsxPragma - createElement factory name, used for [reactive-di](https://github.com/zerkalica/reactive-di) components

Example .babelrc:

```json
{
    "plugins": [
        "syntax-flow",
        "transform-decorators-legacy",
        ["transform-metadata", {
            "reservedGenerics": ["Class", "ResultOf"],
            "onlyExports": false,
            "typeNameStrategy": "typeName",
            "jsxPragma": "__h"
        }]
    ]
}
```

Restrictions
------------

For interface-based metadata we need to convert types to unique string tokens, something like this:

```js
import type {T} from './types'

function test(t: T) {}
Reflection.defineMetadata(['T.types'], T)
```

JS module import subsystem is poor and nothing is doing in ES standarts for improving it. It's no clean way to identify imported interface in babel plugin, if import path is relative:

Types are same, but import paths is different:

```js
import type {T} from './types'
import type {T} from '../data/types'
```

Ideally, set "typeNameStrategy": "fullPath" and always use absolute path for types via name_mapper in .flowconfig:

```ini
module.name_mapper='^babel-plugin-transform-metadata/i/\(.*\)' -> '<PROJECT_ROOT>/i/\1'
```

```js
import type {T} from 'babel-plugin-transform-metadata/i/types'
import type {R} from './internalTypes'

function test(t: T, r: R) {}
Reflection.defineMetadata(['T.crc1', 'R.crc2'], test)
// where crc1 is crc32('babel-plugin-transform-metadata/i/types')
// where crc2 is crc32('internalTypes')
```

Relative paths supported, but some collisions possible, if types with equal names are defined in different files with equal names:

```js
import type {T} from '../t2/internalTypes'
import type {T} from '../t1/internalTypes'
```

If "typeNameStrategy" is "fullPath", types always will be placed in separate files to avoid collisions like this:

```js
// t1.js
export type T = {
    some: string;
}

function test(t: T) {}
Reflection.defineMetadata(['T'], test)
```

```js
// t2.js
import type {T} from './t2'

function test2(t: T) {}
Reflection.defineMetadata(['T.t2'], test2)
```

If "typeNameStrategy" is "typeName", import paths will be ignored. But possible collisions with equal type names in different files.

## Credits

[babel-plugin-angular2-annotations](https://github.com/shuhei/babel-plugin-angular2-annotations)
