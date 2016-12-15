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
'use strict';

var _react = require('react');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var B = function B() {
    _classCallCheck(this, B);
};

var f = 123;

var A = function A(b, e, i, some) {
    _classCallCheck(this, A);
};

dec2({ k: 'test' })(A, null, 1);
dec1(A, null, 0);
A._rdiArg = [B, 'IT', {
    s: String,
    b: V
}, f];

function ComponentD(rec, state, _t) {
    return _t.h(
        'div',
        null,
        'AA'
    );
}

ComponentD._rdiDbg = 'babel-plugin-transform-metadata/src/__tests__/data/AllFeatures.js#ComponentD';
ComponentD._rdiJsx = true;
ComponentD._rdiArg = [{
    s: Number
}];
function factory() {
    return function () {};
}

factory._rdiDbg = 'babel-plugin-transform-metadata/src/__tests__/data/AllFeatures.js#factory';
factory._rdiFn = true;


function fn(a, b, f) {
    function fn2(a) {}
}

fn._rdiDbg = 'babel-plugin-transform-metadata/src/__tests__/data/AllFeatures.js#fn';
fn._rdiFn = true;
fn._rdiArg = [A, B, factory];
var id = 'IT';
```

## .babelrc options

Add before babel-plugin-transform-decorators-legacy and other transformation plugins.
-   onlyExports: boolean - if true - add metadata only to exported function/classes
-   typeNameStrategy: 'fullPath' | 'typeName' - how to generate interface name tokens: fullPath - type name + crc(file with type path), typeName - type name only.
-   jsxPragma - createElement factory name, used for [reactive-di](https://github.com/zerkalica/reactive-di) components
-   addDebugId - true/false add debug Id to each exported class or function for hot reloading
Example .babelrc:

```json
{
    "plugins": [
        "syntax-flow",
        "transform-decorators-legacy",
        ["transform-metadata", {
            "addDebugId": true,
            "onlyExports": false,
            "typeNameStrategy": "typeName",
            "jsxPragma": "_t"
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
