// @flow

class B {}

const FN: (a: string) => void = ((() => {}): any);

// type FN = typeof FN
function createFn(): typeof FN {
    return (a: string) => {

    }
}

type ResultOf<F> = _ResultOf<*, F>
type _ResultOf<V, F: (...x: any[]) => V> = V

interface Deps {
    b: Class<B>;
    f: typeof FN;
    d: ResultOf<createFn>
}

class MyClass {
    constructor(deps: Deps, b: Class<B>, d: typeof FN) {}
}
