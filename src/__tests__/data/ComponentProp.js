// @flow
class A {}

interface State {
    a: A;
    b: string;
}
class MyClass {
    state: State;
    constructor(state: State) {

    }
}
