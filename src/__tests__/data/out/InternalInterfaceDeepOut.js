// @flow

interface A {
    b: string
}
interface C {
    a: A
}
let MyClass = class MyClass {
    constructor(c: C) {}
};
Reflect.defineMetadata("design:paramtypes", [{
    a: {
        b: String
    }
}], MyClass);