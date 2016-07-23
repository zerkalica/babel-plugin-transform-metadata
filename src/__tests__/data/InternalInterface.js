// @flow

class A {}
interface C {
    a: A;
}
class MyClass {
    constructor(c: C) {}
}
