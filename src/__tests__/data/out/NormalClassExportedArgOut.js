// @flow

export let A = class A {};
export const B = class cB {};

let MyClass = class MyClass {
    constructor(a: A, b: B) {}
};
export { MyClass as default };
Reflect.defineMetadata("design:paramtypes", [A, B], MyClass);