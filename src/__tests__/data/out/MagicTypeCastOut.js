let A = class A {}; // @flow

export interface C {
    a: A
}
let MyClass = class MyClass {
    constructor(c: C) {}
};
Reflect.defineMetadata('design:paramtypes', ['C'], MyClass);


const id = 'C';