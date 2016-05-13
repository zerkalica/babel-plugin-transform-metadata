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