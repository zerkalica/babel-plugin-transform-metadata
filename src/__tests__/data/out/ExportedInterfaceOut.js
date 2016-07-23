// @flow

let A = class A {};


export interface C {
    a: A
}
let MyClass = class MyClass {
    constructor(c: C) {}
};
Reflect.defineMetadata("design:paramtypes", ["C"], MyClass);