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

class MyClass2 {
    constructor() {}
}

class MyClass3 {
}
