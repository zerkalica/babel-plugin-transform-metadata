// @flow

interface A {
    b: string;
}
interface C {
    a: A;
}
class MyClass {
    constructor(c: C) {}
}
