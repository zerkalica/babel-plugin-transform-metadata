// @flow

class B<V> {}

interface Deps<V> {
    b: B<V>;
}

class MyClass {
    constructor(deps: Deps<*>) {}
}
