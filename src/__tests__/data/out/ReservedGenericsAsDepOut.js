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

createFn._r = [2];
createFn.displayName = "babel-plugin-transform-metadata/src/__tests__/data/ReservedGenericsAsDep.js#createFn";

var MyClass = function MyClass(deps, b, d) {
    _classCallCheck(this, MyClass);
};

MyClass._r = [0, [{
    b: B,
    r: B,
    f: FN,
    d: createFn,
    d2: createFn
}, B, FN]];
MyClass.displayName = "babel-plugin-transform-metadata/src/__tests__/data/ReservedGenericsAsDep.js#MyClass";