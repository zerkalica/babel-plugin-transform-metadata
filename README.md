babel-plugin-transform-metadata
===============================

Reflection metadata support for classes and functions.

[flowtype](https://flowtype.org) and [typescript](https://www.typescriptlang.org/) reflection does not support type annotations as value keys, so we use some trick with typecast.

```js
// @flow
import type {SomeType} from './types'
import _ from 'babel-plugin-transform-metadata/_'

const types = [
    [(_: SomeType), '213'] // converted to ['SomeType.<crc('types')>', '213']
]
```

```js
// @flow
import type {SomeType} from './types'

export function test(depA: SomeType): void {}
// _inject(['SomeType.<crc('types')>'], test);
```

Features

-	Can convert [flowtype](https://flowtype.org) type expressions to metadata.
-	Various way to store metdata: Reflection polyfill, Symbol or custom imported helper.
-	Metadata provided for plain function and object-style arguments.
-	Metadata provided only for exported classes and functions.

Why not [babel-plugin-angular2-annotations](https://github.com/shuhei/babel-plugin-angular2-annotations) ?

Main idea of babel-plugin-angular2-annotations is compability with [angular2](https://angular.io) in babel environment and contains unnecessary functionality: typescript-style decorators support. Interfaces not supported, only Reflection.defineMetadata used as polyfill, object-style arguments does not supported.

.babelrc options
----------------

Add before babel-plugin-transform-decorators-legacy and other transformation plugins.

-	metaDriver: How to store metadata: import, symbol, reflection, property.
-	driverImport - If "metaDriver" = "import". Path to custom reflection polyfill.
-	argComment - magic comment text. After this comment all function or constructor args will not be included to metadata.
-	typeNameStrategy - how to generate interface name tokens: fullPath - type name + crc(file with type path), typeName - type name only.

Example .babelrc:

```json
{
    "plugins": [
        "syntax-flow",
        ["transform-metadata", {
            "typeNameStrategy": "fullPath",
            "argComment": "@args",
            "metaDriver": "import",
            "driverImport": "reactive-di/inject"
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

Like this:

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

Composable
----------

In some cases with [reactive-di](https://github.com/zerkalica/reactive-di) and react we need composable-style functions: mix dependencies and call-time arguments. '@args' comment separates di-dependencies from call-time arguments. After this comment arguments will not be included to reflection metadata.

```js
// @flow
export function test(depA: A, /* @args */ d: D, d2: D): void {}
// _inject([A], test);
```

or using magic Deps type:

```js
// @flow
import type {Deps} from 'babel-plugin-transform-metadata/Deps'

export function test(deps: Deps<{
    depA: A
}>, d: D, d2: D): void {}
// _inject([{depA: A}], test);
```

For object-style arguments:

```js
// @flow
type Props = {
    a: A;
    /* @args */
    d: D;
};

class Widget2 {
    constructor(props: Props) {}
}
// _inject([{a: A}], Widget2);
```

Another way to separate call-time arguments is [type intersection](http://flowtype.org/docs/union-intersection-types.html#intersection-example)

```js
// @flow
type Args = {
    d: D;
    d2: D;
}

type Props = Args & {
    a: A
};

function test(t: Props) {}
// _inject([{a: 'A'}], test)
```

Complex example
---------------

Transform code like this

```js
/* @flow */
import D from './D'

import type {ITest as IT} from '../../__tests__/data/ITest'
import type {ITest as IT2} from './ITest'
import type {ITest as IT3} from 'babel-plugin-transform-metadata/__tests__/data/ITest'

import type {Deps} from 'babel-plugin-transform-metadata/Deps'

import _ from 'babel-plugin-transform-metadata/_'

export class A {}

export class B {
    a: A;

    constructor(opts: {
        d: D;
        a: A;
        i: IT;
    }) {
        this.a = opts.a
    }
}

export class Widget {
    constructor(props: {
        a: A;
        i: IT3;
        /* @args */
        d: D;
        d2: D;
    }) {
    }
}

type W2Part = {
    d2: D;
}
type W2Props = W2Part & {
    a: A;
    ErrorableElement: Class<React$Component<void, {
        error: ?string|React$Component,
    }, void>>;
    /* @args */
    d: D;
}

class Widget2 {
    constructor(props: W2Props) {}
}

export {Widget2}

type W3Props = {
    deps: Deps<{
        a: A;
    }>;
    d: D;
    d2: D;
}

class Widget3 {
    constructor(props: W3Props) {}
}

export {Widget3}


export type R<V> = {
    some: V;
}

export class C<V> {
    b: B;

    constructor(b: B, r: R<V>, i: IT, i2: IT2) {
        this.b = b
    }
}

function test<F: Object>(depA: A, f: F, /* @args */ d: D, d2: D): void {}

export default test

export function test2(deps: Deps<{a: A}>, d: D, d2: D): void {}

const types = [
    [(_: R), '213'],
    [(_: IT3), '321']
]

type ErrorableElementProps = {
    /* @args */
    children: React$Element;
    error?: React$Element;
}

export function ErrorableElement({children, error}: ErrorableElementProps) {}
```

to this:

```js
/* @flow */
import D from './D';

import type { ITest as IT } from '../../__tests__/data/ITest';
import type { ITest as IT2 } from './ITest';
import type { ITest as IT3 } from 'babel-plugin-transform-metadata/__tests__/data/ITest';

import type { Deps } from 'babel-plugin-transform-metadata/Deps';

function _inject(params, target: any) {
    target[Symbol.for('design:paramtypes')] = params;
}

export class A {}

export class B {
    a: A;

    constructor(opts: {
        d: D;
        a: A;
        i: IT;
    }) {
        this.a = opts.a;
    }
}

_inject([{
    d: D,
    a: A,
    i: 'ITest.3402154763'
}], B);

export class Widget {
    constructor(props: {
        a: A;
        i: IT3
        /* @args */
        ; d: D;
        d2: D;
    }) {}
}

_inject([{
    a: A,
    i: 'ITest.1013217576'
}], Widget);

type W2Part = {
    d2: D
};
type W2Props = W2Part & {
    a: A;
    ErrorableElement: Class<React$Component<void, {
        error: ?string | React$Component
    }, void>>
    /* @args */
    ; d: D;
};

class Widget2 {
    constructor(props: W2Props) {}
}

_inject([{
    a: A,
    ErrorableElement: 'Class'
}], Widget2);

export { Widget2 };

type W3Props = {
    deps: Deps<{
        a: A
    }>;
    d: D;
    d2: D;
};

class Widget3 {
    constructor(props: W3Props) {}
}

_inject([{
    a: A
}], Widget3);

export { Widget3 };

export type R<V> = {
    some: V
};

export class C<V> {
    b: B;

    constructor(b: B, r: R<V>, i: IT, i2: IT2) {
        this.b = b;
    }
}

_inject([B, 'R', 'ITest.3402154763', 'ITest.3402154763'], C);

function test<F: Object>(depA: A, f: F, /* @args */d: D, d2: D): void {}

_inject([A, 'F'], test);

export default test;

export function test2(deps: Deps<{ a: A }>, d: D, d2: D): void {}

_inject([{
    a: A
}], test2);

const types = [['R', '213'], ['ITest.1013217576', '321']];

type ErrorableElementProps = {
    /* @args */
    children: React$Element;
    error?: React$Element;
};

export function ErrorableElement({ children, error }: ErrorableElementProps) {}

_inject([{}], ErrorableElement);
```
