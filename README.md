# babel-plugin-transform-metadata

Reflection metadata support for classes and functions with [flowtype](https://flowtype.org) type aliases support.

flowtype and [typescript](https://www.typescriptlang.org/) reflection does not support type annotations as value keys, so we use some trick with typecast.

Features:

-   Can convert flowtype type expressions to metadata.
-   Can import custom Reflection polyfill
-   Metadata provided for plain function and object-style arguments
-   Functions marked as 'design:function'
-   With transform-decorators-legacy supports argument decorators
-   Can extract metadata from react state definition in component

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
interface State {p: number}
class ComponentE extends ReactComponent<Props, Props, State> {}

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

interface State { p: number }
let ComponentE = class ComponentE extends ReactComponent<Props, Props, State> {};
Reflect.defineMetadata('design:paramtypes', [{
    p: Number
}], ComponentE);


function factory(): () => void {
    return () => {};
}

Reflect.defineMetadata('design:function', true, factory);
type ResultOf<F> = _ResultOf<*, F>;
type _ResultOf<V, F: (...x: any[]) => V> = V;

function fn(a: A, b: Class<B>, f: ResultOf<factory>) {
    function fn2(a: A) {}
}

Reflect.defineMetadata('design:function', true, fn);
Reflect.defineMetadata('design:paramtypes', [A, B, factory], fn);
const id = 'IT';
```

## .babelrc options

Add before babel-plugin-transform-decorators-legacy and other transformation plugins.
-   reservedGenerics: string[] - first arguments of this generics treated as dependency, default is ['Class', 'ResultOf']
-   onlyExports: boolean - if true - add metadata only to exported function/classes
-   reflectImport: ?string - Path to import custom reflection polyfill.
-   typeNameStrategy: 'fullPath' | 'typeName' - how to generate interface name tokens: fullPath - type name + crc(file with type path), typeName - type name only.
-   depsPositions: from which position of extendable class generic get dependency definition, usefull with react components

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
            "depsPositions": [
                {
                    "import": "fake-react",
                    "name": "Component",
                    "pos": 1
                },
                {
                    "import": "react",
                    "name": "React|Component",
                    "pos": 2
                }
            ]
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
