# babel-plugin-transform-metadata

Strict, optimized and smart reflection metadata generator for classes and functions from [flowtype](https://flowtype.org) metadata.

-   Supports arrows and function expressions
-   Metadata provided for array and object-style arguments
-   Generics and type arguments supported
-   With transform-decorators-legacy supports argument decorators
-   Adds createVNode as third argument to each function with jsx, used in [reactive-di](https://github.com/zerkalica/reactive-di) components: (props, state, h) => React$Element
-   typeof, Class support

## Examples

### Interface as value

Flowtype and [typescript](https://www.typescriptlang.org/) reflection does not support type annotations as value keys, so we use some trick with typecast.

In:

```js
// @flow

import _ from 'babel-plugin-transform-metadata/_'

class A {}

export interface C {
    a: A;
}
class MyClass {
    constructor(c: C) {}
}

const id = (_: C)
```

Out:

```js
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var A = function A() {
    _classCallCheck(this, A);
};

var MyClass = function MyClass(c) {
    _classCallCheck(this, MyClass);
};

MyClass.displayName = 'MyClass';
MyClass._r3 = 'babel-plugin-transform-metadata/src/__tests__/data/MagicTypeCast.js';
MyClass._r1 = ['C'];


var id = 'C';
```

### Mark function

In:

```js
// @flow

function fn(a: A) {
    function fn2(a: A) {

    }
}
```

Out:

```js
"use strict";

function fn(a) {
    function fn2(a) {}
}
fn.displayName = "fn";
fn._r3 = "babel-plugin-transform-metadata/src/__tests__/data/FunctionMark.js";
fn._r2 = 2;
fn._r1 = [A];
```

### Components metadata

We use [inferno](https://infernojs.org/) style createVNode:

In:

```js
// @flow
class A {}
interface State {s: A}
function ComponentD(rec: {p: number}, state: State) {
    return <div>AA</div>
}
```

Out:

```js

function A() {}

function ComponentD(rec, state, createVNode) {
    return createVNode(2, 'div', null, 'AA');
}

ComponentD.displayName = 'ComponentD';
ComponentD._r3 = 'babel-plugin-transform-metadata/src/__tests__/data/AllFeatures.js';
ComponentD._r2 = 1;
ComponentD._r1 = [{
    s: A
}];
```

### Type parameters
In example below, ISource and IStatus to ids mappings are configured in .babelrc.
Only first type parameter used.

In:

```js
// @flow
type ResultOf<F> = _ResultOf<*, F>
type _ResultOf<V, F: (...x: any[]) => V> = V

function fn(a: A, b: Class<B>, f: ResultOf<typeof factory>, sA: ISource<A>, saf: IStatus<A | B>) {
    function fn2(a: A) {
    }
}
```

Out:

```js
'use strict';

function fn(a, b, f, sA, saf) {
    function fn2(a) {}
}

fn.displayName = 'fn';
fn._r3 = 'babel-plugin-transform-metadata/src/__tests__/data/AllFeatures.js';
fn._r2 = 2;
fn._r1 = [A, B, factory, {
    _r4: 1,
    v: [A]
}, {
    _r4: 2,
    v: [A, B]
}];
```

For more examples see ``` ./src/__tests__/data ```


## Metadata

To each function plugin adds following metadata:

```js

  /**
   * Class constructor or function argument
   */
  type IArg = IFunction | {

    /**
     * User defined interface id, see markGenerics
     */
    _r4: number;
    /**
     * Type arguments
     */
    v: IFunction[];
  }

  /**
   * Each function or class constructor
   */
  interface IFunction {
    (...args: any[]): any;
    /**
     * constructor/function arguments list
     */
    _r1?: IArg[];

    /**
     * bit flags: 1 - jsx, 2 - fn
     */
    _r2?: number;

    /**
     * relative filePath for hmr and debugging
     */
    _r3?: string;
  }
```

## .babelrc options

Add before babel-plugin-transform-decorators-legacy and other transformation plugins.

```js
interface IOptions {
   /**
    * if true - add metadata only to exported function/classes
    */
    onlyExports?: boolean;

    /**
     * if true - add file path to each exported class or function for hot reloading
     */
    addFileName?: boolean;

    /**
     * if true - add function/class name to each exported class or function
     */
    addDisplayName?: boolean;

    /**
     * how to generate interface name tokens:
     * fullPath - type name + crc(file with type path), typeName - type name only
     */
    typeNameStrategy?: 'typeName' | 'fullPath';

    /**
     * createElement/createVNode factory name, used for [reactive-di](https://github.com/zerkalica/reactive-di) components
     */
    jsxPragma?: string;

    /**
     * Interface to ids mappings: {'ISource': 1, 'IStatus': 2}
     */
    markGenerics?: {[id: string]: number};
}
```

Example .babelrc:

```json
{
    "plugins": [
        "syntax-flow",
        "transform-decorators-legacy",
        ["transform-metadata", {
            "addFilename": true,
            "onlyExports": false,
            "markGenerics": {"ISource": 1, "IStatus": 2},
            "typeNameStrategy": "typeName",
            "jsxPragma": "createVNode"
        }]
    ]
}
```

## Restrictions

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
