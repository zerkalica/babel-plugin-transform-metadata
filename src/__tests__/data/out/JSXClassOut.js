// @flow

let ComponentA = class ComponentA {
    render() {
        return <div>a</div>;
    }
};
let ComponentB = class ComponentB {
    render() {
        return <div><ComponentA />b</div>;
    }
};


const ComponentC = () => <div><ComponentB /></div>;

function ComponentE() {
    return <div>E</div>;
}

Reflect.defineMetadata("design:function", true, ComponentE);
function ComponentFFactory() {
    return () => <div>F</div>;
}

Reflect.defineMetadata("design:function", true, ComponentFFactory);
let ComponentD = class ComponentD {
    render() {
        const c = <div><ComponentA />b</div>;
        return c;
    }
};