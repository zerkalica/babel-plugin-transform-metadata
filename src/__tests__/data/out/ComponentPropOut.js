// @flow
let A = class A {};


interface State {
    a: A;
    b: string;
}
let MyClass = class MyClass {
    state: State;
    constructor(state: State) {}
};
Reflect.defineMetadata("design:paramtypes", [{
    a: A,
    b: String
}], MyClass);