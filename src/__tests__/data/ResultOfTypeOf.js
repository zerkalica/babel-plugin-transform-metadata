// @flow

const FN: (a: string) => void = ((() => {}): any);

// type FN = typeof FN
function createFn(): typeof FN {
    return (a: string) => {

    }
}

type ResultOf<F> = _ResultOf<*, F>
type _ResultOf<V, F: (...x: any[]) => V> = V

interface Deps {
    d2: ResultOf<typeof createFn>;
}
class MyClass {
    constructor(deps: Deps) {}
}
