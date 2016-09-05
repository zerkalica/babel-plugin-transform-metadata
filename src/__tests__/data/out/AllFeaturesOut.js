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
let ComponentE = class ComponentE extends ReactComponent<Props, Props, State> {
    render() {
        const __h = this.__h;

        return <br />;
    }
};
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