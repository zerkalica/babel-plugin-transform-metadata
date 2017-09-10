"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FN = function FN() {};

// type FN = typeof FN
function createFn() {
    return function (a) {};
}

createFn._r = [2];
createFn.displayName = "babel-plugin-transform-metadata/src/__tests__/data/ResultOfTypeOf.js#createFn";

var MyClass = function MyClass(deps) {
    _classCallCheck(this, MyClass);
};

MyClass._r = [0, [{
    d2: createFn
}]];
MyClass.displayName = "babel-plugin-transform-metadata/src/__tests__/data/ResultOfTypeOf.js#MyClass";