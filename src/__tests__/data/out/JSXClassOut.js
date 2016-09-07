// @flow

function ComponentA(rec: { p: number }, state: { s: number }, h) {
    return <div>AA</div>;
}

Reflect.defineMetadata("design:function", true, ComponentA);
Reflect.defineMetadata("design:paramtypes", [{
    s: Number
}], ComponentA);
const ComponentB = (props, state: { s: number }, __h) => <div>qwe</div>;

Reflect.defineMetadata("design:function", true, ComponentB);
Reflect.defineMetadata("design:paramtypes", [{
    s: Number
}], ComponentB);
const ComponentC = function ComponentC(props, state: { ss: number }, __h) {
    return <div></div>;
};

Reflect.defineMetadata("design:function", true, ComponentC);
Reflect.defineMetadata("design:paramtypes", [{
    ss: Number
}], ComponentC);
function ComponentE(props, state, __h) {
    const b = { a: [<div>E</div>] };
}

Reflect.defineMetadata("design:function", true, ComponentE);
function ComponentD(rec: { p: number }, state, __h) {
    return <div>AA</div>;
}

Reflect.defineMetadata("design:function", true, ComponentD);
const ComponentF = (props, state, __h) => <div>qwe</div>;
Reflect.defineMetadata("design:function", true, ComponentF);