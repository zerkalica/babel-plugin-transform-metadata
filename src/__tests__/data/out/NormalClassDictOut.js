// @flow

let B = class B<V> {};


interface Deps<V> {
    b: B<V>
}

let MyClass = class MyClass {
    constructor(deps: Deps<*>) {}
};
Reflect.defineMetadata("design:paramtypes", [{
    b: B
}], MyClass);