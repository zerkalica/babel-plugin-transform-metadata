// @flow

let B = class B {};


const FN: (a: string) => void = (() => {}: any);

// type FN = typeof FN
function createFn(): typeof FN {
    return a => {};
}

Reflect.defineMetadata("design:subtype", "func", createFn);
type ResultOf<F> = _ResultOf<*, F>;
type _ResultOf<V, F: (...x: any[]) => V> = V;

interface Deps {
    b: Class<B>;
    f: typeof FN;
    d: ResultOf<createFn>;
}

let MyClass = class MyClass {
    constructor(deps: Deps, b: Class<B>, d: typeof FN) {}
};
Reflect.defineMetadata("design:paramtypes", [{
    b: B,
    f: FN,
    d: createFn
}, B, FN], MyClass);