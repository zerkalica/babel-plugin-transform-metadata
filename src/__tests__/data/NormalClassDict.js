// @flow
import type {IT, IW} from './imports/ITest'
class B {
  constructor(v2: IW<IT>) {}
}

type UI<V> = mixed

function fn<V>(v: UI<V>) {}

interface Deps<V> {
    b: B<V>;
}

class MyClass {
    constructor(deps: Deps<*>) {}
}
