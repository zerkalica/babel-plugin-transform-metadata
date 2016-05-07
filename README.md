babel-plugin-transform-metadata
===============================

Reflection metadata support for classes and functions.

Why not [babel-plugin-angular2-annotations](https://github.com/shuhei/babel-plugin-angular2-annotations) ?

-	This plugin provides reflections only for classes, not for functions.
-	It's reflection engine does not support flow interfaces: only real classes.
-	We can't change reflection polyfill: Reflection object loaded as global.
-	Main idea of babel-plugin-angular2-annotations is compability with angular2 in babel environment and contains unnecessary functionality: typescript-style decorators support.
-	Metadata provided only for array-style arguments, not for object-style.
-	Metadata provided for all classes, but this is unnecessary

.babelrc options
----------------

Add before babel-plugin-transform-decorators-legacy and other transformation plugins.

-	reflectImport - Import path to custom reflection polyfill. Without this option standard Reflection.defineMetadata will be used.
-	argComment - magic comment text. After this comment all function or constructor args will not be included to metadata.

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

Exports
-------

Metadata generated only for exports:

```js
export test
export {widget}

export default test2

export class Test {}

export function test2() {}
```

Object-style arguments
----------------------

In some cases we can't pass arguments as array, only as object (ex. react widgets).

```js
export class Widget {
    constructor(props: {
        a: A
    }) {}
}

// Generated:
_inject([{
    a: A
}], Widget);
```

For type aliases:

```js
type W2Props = {
    a: A
};

class Widget2 {
    constructor(props: W2Props) {}
}

// Generated:
_inject([{
    a: A
}], Widget2);
```

But for exported type aliases:

```js
export type W2Props = {
    a: A
};

class Widget2 {
    constructor(props: W2Props) {}
}

// Generated:
_inject(['W2Props'], Widget2);
```

Interfaces
----------

flowtype and typescript reflection does not support type annotations as value keys, so we use some trick with typecast.

WARNING: interface name must be unique. It's difficult to generate unique key on each interface.

```js
import type {SomeType} from './types'
// import magic _ from babel-plugin-transform-metadata/_
import _ from 'babel-plugin-transform-metadata/_'

const types = [
    [(_: SomeType), '213'] // converted to ['SomeType', '213']
]
```

```js
import type {SomeType} from './types'

export function test(depA: SomeType): void {}
// _inject(['SomeType'], test);
```

Composable
----------

In some cases with [reactive-di](https://github.com/zerkalica/reactive-di) and react we need composable-style functions: mix dependencies and call-time arguments. '@args' comment separates di-dependencies from call-time arguments. After this comment arguments will not be included to reflection metadata.

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

For object-style arguments:

```js
type W2Props = {
    a: A
    /* @args */
    ; d: D;
    d2: D;
};

class Widget2 {
    constructor(props: W2Props) {}
}

// Generated:
_inject([{
    a: A
}], Widget2);
```

Example
-------

Transform code like this

```js
/* @flow */
import type {ITest as IT} from '../../__tests__/data/ITest'
import type {ITest as IT2} from './ITest'

import _ from 'babel-plugin-transform-metadata/_'

export class A {}

class D {}

export class B {
    a: A;

    constructor(opts: {
        a: A;
        i: IT;
    }) {
        this.a = opts.a
    }
}

export class Widget {
    constructor(props: {
        a: A;
        /* @args */
        d: D;
        d2: D;
    }) {
    }
}

type W2Props = {
    a: A;
    /* @args */
    d: D;
    d2: D;
}

class Widget2 {
    constructor(props: W2Props) {}
}

export {Widget2}

export type R<V> = {
    some: V;
}

export class C<V> {
    b: B;

    constructor(b: B, r: R<V>, i: IT, i2: IT2) {
        this.b = b
    }
}

function test(depA: A, /* @args */ d: D, d2: D): void {}

export default test
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

class D {}

export class B {
    a: A;

    constructor(opts: {
        a: A;
        i: IT;
    }) {
        this.a = opts.a;
    }
}

_inject([{
    a: A,
    i: 'ITest'
}], B);

export class Widget {
    constructor(props: {
        a: A
        /* @args */
        ; d: D;
        d2: D;
    }) {}
}

_inject([{
    a: A
}], Widget);

type W2Props = {
    a: A
    /* @args */
    ; d: D;
    d2: D;
};

class Widget2 {
    constructor(props: W2Props) {}
}

_inject([{
    a: A
}], Widget2);

export { Widget2 };

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

function test(depA: A, /* @args */d: D, d2: D): void {}

_inject([A], test);

export default test;
const types = [['R', '213']];
```
