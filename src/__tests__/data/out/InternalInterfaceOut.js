// @flow

let A = class A {};

interface C {
    a: A
}
let MyClass = class MyClass {
    constructor(c: C) {}
};
Reflect.defineMetadata("design:paramtypes", [{
    a: A
}], MyClass);