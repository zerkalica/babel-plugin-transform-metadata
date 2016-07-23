// @flow
import type {IT} from './imports/ITest'

import _ from 'babel-plugin-transform-metadata/_'

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