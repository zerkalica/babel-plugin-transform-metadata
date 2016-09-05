// @flow

class ComponentA {
    render() {
        return <div>a</div>
    }
}

class ComponentB {
    render() {
        return <div><ComponentA/>b</div>
    }
}

interface State {
    p: number;
}

const ComponentC = () => <div><ComponentB/></div>

function ComponentE() {
    const b = {a: [<div>E</div>]}
}

function ComponentFFactory1(state: State) {
    return () => <div>F</div>
}

function ComponentFFactory2({p}: State) {
    return () => <div>F</div>
}

function ComponentFFactory3({p}: State) {
    return function componentf() {
        return <div>F</div>
    }
}

class ComponentD {
    render() {
        const c = <div><ComponentA/>b</div>
        return c
    }
}
