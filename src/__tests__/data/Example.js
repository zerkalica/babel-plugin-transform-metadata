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
