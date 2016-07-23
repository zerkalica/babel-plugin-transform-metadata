// @flow

let A = class A {};
let B = class B {};
let MyClass = class MyClass {
    constructor(a: A, b: B) {}
};
dec2('test')(MyClass, null, 1);
dec1(MyClass, null, 0);
Reflect.defineMetadata('design:paramtypes', [A, B], MyClass);