// @flow
let MyClass = class MyClass {
    constructor(state: {
        a: A;
        b: string;
    }) {}
};
Reflect.defineMetadata("design:paramtypes", [{
    a: "A",
    b: String
}], MyClass);