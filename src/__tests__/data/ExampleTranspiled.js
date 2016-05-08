import _inject from 'reactive-di/inject';
/* @flow */
import type { ITest as IT } from '../../__tests__/data/ITest';
import type { ITest as IT2 } from './ITest';
import type { ITest as IT3 } from 'babel-plugin-transform-metadata/__tests__/data/ITest';

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

_inject([B, 'R', 'ITest.3402154763', 'ITest.3402154763'], C);

function test(depA: A, /* @args */d: D, d2: D): void {}

_inject([A], test);

export default test;
const types = [['R', '213']];