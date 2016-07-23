// @flow

class A {}
class B {}


class MyClass {
    constructor(
        @dec1 a: A,
        @dec2('test') b: B
    ) {}
}
