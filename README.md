# babel-plugin-transform-metadata

Reflection metadata support for classes and functions.

Why not [babel-plugin-angular2-annotations](https://github.com/shuhei/babel-plugin-angular2-annotations) ?

* This plugin provides reflections only for classes, not for functions.
* It's reflection engine does not support flow interfaces: only real classes.
* We can't change reflection polyfill: Reflection object loaded as global.
* Main idea of babel-plugin-angular2-annotations is compability with angular2 in babel environment and contains unnecessary functionality: typescript-style decorators support.

## .babelrc options

* reflectImport - Import path to custom reflection polyfill. Without this option standard Reflection.defineMetadata will be used.
* argComment - magic comment text. After this comment all function or constructor args will be ignored and does not inclueded to metadata.

.babelrc:

```json
{
    "plugins": [
        "syntax-flow",
        ["transform-metadata", {
            "argComment": "@args",
            "reflectImport": "reactive-di/inject"
        }]
    ]
}
```

## Interfaces

flowtype and typescript reflection does not support type annotations, so we use some trick with typecast.
WARNING: interface name must be unique.

```js
import type {SomeType} from './types'
import _ from 'babel-plugin-transform-reactive-di/_'

const types = [
    [(_: SomeType), '213'] // converted to ['SomeType', '213']
]
```

```js
import type {SomeType} from './types'

export function test(depA: SomeType): void {}
```

## Composable

In some cases with [reactive-di](https://github.com/zerkalica/reactive-di) we need composable-style functions: mix dependencies and call-time arguments. '@args' comment separate di-dependencies from arguments.

```js
// test.js
export function test(depA: A, /* @args */ d: D, d2: D): void {}
```

transforms into

```js
// test.js
export function test(depA: A, /* @args */d: D, d2: D): void {}

_inject([A], test);
```

di code:
```js
// main.js
import test from './test'
// ...
// We don't need to provide depA, container inject it:
container.get(test)(new D, new D)
```

## Example

This adds

```js
import _inject from 'reactive-di/inject' in each file
```

Transform code like this

```js

/* @flow */
import type {ITest as IT} from '../../__tests__/data/ITest'
import type {ITest as IT2} from './ITest'

import _ from 'babel-plugin-transform-reactive-di/_'

export class A {

}

export class B {
    a: A;

    constructor(a: A) {
        this.a = a
    }
}

export type R<V> = {
    some: V;
}

export class C<V> {
    b: B;

    constructor(b: B, r: R<V>, i: IT, i2: IT2) {
        this.b = b
    }
}

class D {

}

export function test(depA: A, /* @args */ d: D, d2: D): void {}

const types = [
    [(_: R), '213']
]
```

to this:

```js
import _inject from 'reactive-di/inject';
/* @flow */
import type { ITest as IT } from '../../__tests__/data/ITest';
import type { ITest as IT2 } from './ITest';

export class A {}

export class B {
    a: A;

    constructor(a: A) {
        this.a = a;
    }
}

_inject([A], B);

export type R<V> = {
    some: V
};

export class C<V> {
    b: B;

    constructor(b: B, r: R<V>, i: IT, i2: IT2) {
        this.b = b;
    }
}

_inject([B, 'R', 'ITest', 'ITest'], C);

class D {}

export function test(depA: A, /* @args */d: D, d2: D): void {}

_inject([A], test);

const types = [['R', '213']];
```
