// @flow

let ComponentA = class ComponentA {
    render() {
        const __h = this.__h;

        return <div>a</div>;
    }
};
let ComponentB = class ComponentB {
    render() {
        const __h = this.__h;

        return <div><ComponentA />b</div>;
    }
};


interface State {
    p: number
}

const ComponentC = () => <div><ComponentB /></div>;

function ComponentE() {
    const b = { a: [<div>E</div>] };
}

Reflect.defineMetadata("design:function", true, ComponentE);
function ComponentFFactory1(state: State) {
    const __h = state.__h;

    return () => <div>F</div>;
}

Reflect.defineMetadata("design:function", true, ComponentFFactory1);
Reflect.defineMetadata("design:paramtypes", [{
    p: Number
}], ComponentFFactory1);
function ComponentFFactory2({ p, __h: __h
}: State) {
    return () => <div>F</div>;
}

Reflect.defineMetadata("design:function", true, ComponentFFactory2);
Reflect.defineMetadata("design:paramtypes", [{
    p: Number
}], ComponentFFactory2);
function ComponentFFactory3({ p, __h: __h
}: State) {
    return function componentf() {
        return <div>F</div>;
    };
}

Reflect.defineMetadata("design:function", true, ComponentFFactory3);
Reflect.defineMetadata("design:paramtypes", [{
    p: Number
}], ComponentFFactory3);
let ComponentD = class ComponentD {
    render() {
        const __h = this.__h;

        const c = <div><ComponentA />b</div>;
        return c;
    }
};