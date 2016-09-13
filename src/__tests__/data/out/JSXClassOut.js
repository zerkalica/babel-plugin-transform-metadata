// @flow

function ComponentA(rec: { p: number }, state: { s: number }, h) {
    return <div>AA</div>;
}

Reflect.defineMetadata("design:subtype", "jsx", ComponentA);
Reflect.defineMetadata("design:paramtypes", [{
    s: Number
}], ComponentA);
const ComponentB = (props, state: { s: number }, __h) => <div>qwe</div>;

Reflect.defineMetadata("design:subtype", "jsx", ComponentB);
Reflect.defineMetadata("design:paramtypes", [{
    s: Number
}], ComponentB);
const ComponentC = function ComponentC(props, state: { ss: number }, __h) {

    const b = () => {
        a: [<div>E</div>];
    };

    Reflect.defineMetadata("design:subtype", "func", b);
    return <div></div>;
};

Reflect.defineMetadata("design:subtype", "jsx", ComponentC);
Reflect.defineMetadata("design:paramtypes", [{
    ss: Number
}], ComponentC);
function ComponentE(props, state, __h) {
    const b = () => {
        a: [<div>E</div>];
    };
    Reflect.defineMetadata("design:subtype", "func", b);
}

Reflect.defineMetadata("design:subtype", "jsx", ComponentE);
function ComponentD(rec: { p: number }, state, __h) {
    return <div>AA</div>;
}

Reflect.defineMetadata("design:subtype", "jsx", ComponentD);
const ComponentF = (props, state, __h) => <div>qwe</div>;

Reflect.defineMetadata("design:subtype", "jsx", ComponentF);
function ComponentG(rec: { p: number }, state, __h) {
    return <div>{items.map(i => <div>{i}</div>)}</div>;
}
Reflect.defineMetadata("design:subtype", "jsx", ComponentG);