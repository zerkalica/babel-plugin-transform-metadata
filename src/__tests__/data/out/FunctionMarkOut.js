// @flow

let A = class A {};


function fn(a: A) {
    function fn2(a: A) {}
}
Reflect.defineMetadata("design:subtype", "func", fn);
Reflect.defineMetadata("design:paramtypes", [A], fn);