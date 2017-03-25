"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FN = function FN() {};

// type FN = typeof FN
function createFn() {
    return function (a) {};
}

createFn.displayName = "createFn";
createFn._r3 = "babel-plugin-transform-metadata/src/__tests__/data/ResultOfTypeOf.js";
createFn._r2 = 2;

var MyClass = function MyClass(deps) {
    _classCallCheck(this, MyClass);
};

MyClass.displayName = "MyClass";
MyClass._r3 = "babel-plugin-transform-metadata/src/__tests__/data/ResultOfTypeOf.js";
MyClass._r1 = [{
    d2: createFn
}];