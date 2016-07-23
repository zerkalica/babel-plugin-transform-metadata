// @flow
let A = class A {};
let B = class B {};
let MyClass = class MyClass {
    constructor(a: A, b: B) {}
};
Reflect.defineMetadata("design:paramtypes", [A, B], MyClass);