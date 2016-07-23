// @flow

class A {}

export interface C {
    a: A;
}
class MyClass {
    constructor(c: C) {}
}
