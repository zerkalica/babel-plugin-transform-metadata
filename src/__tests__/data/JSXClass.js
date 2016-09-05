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

const ComponentC = () => <div><ComponentB/></div>

function ComponentE() {
    return <div>E</div>
}

function ComponentFFactory() {
    return () => <div>F</div>
}

class ComponentD {
    render() {
        const c = <div><ComponentA/>b</div>
        return c
    }
}
