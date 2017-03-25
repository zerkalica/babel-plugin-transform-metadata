"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var B = function B() {
    _classCallCheck(this, B);
};

var FN = function FN() {};

// type FN = typeof FN
function createFn() {
    return function (a) {};
}

createFn.displayName = "createFn";
createFn._r3 = "babel-plugin-transform-metadata/src/__tests__/data/ReservedGenericsAsDep.js";
createFn._r2 = 2;

var MyClass = function MyClass(deps, b, d) {
    _classCallCheck(this, MyClass);
};

MyClass.displayName = "MyClass";
MyClass._r3 = "babel-plugin-transform-metadata/src/__tests__/data/ReservedGenericsAsDep.js";
MyClass._r1 = [{
    b: B,
    r: B,
    f: FN,
    d: createFn,
    d2: createFn
}, B, FN];