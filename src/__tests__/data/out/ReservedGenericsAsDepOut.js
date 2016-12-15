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

createFn._rdiDbg = "babel-plugin-transform-metadata/src/__tests__/data/ReservedGenericsAsDep.js#createFn";
createFn._rdiFn = true;

var MyClass = function MyClass(deps, b, d) {
    _classCallCheck(this, MyClass);
};

MyClass._rdiArg = [{
    b: B,
    r: B,
    f: FN,
    d: createFn,
    d2: createFn
}, B, FN];