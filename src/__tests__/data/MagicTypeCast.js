// @flow

import _ from 'babel-plugin-transform-metadata/_'

class A {}

export interface C {
    a: A;
}
class MyClass {
    constructor(c: C) {}
}

const id = (_: C)
