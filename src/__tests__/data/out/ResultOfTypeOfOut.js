"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FN = function FN() {};

// type FN = typeof FN
function createFn() {
    return function (a) {};
}

createFn._rdiDbg = "babel-plugin-transform-metadata/src/__tests__/data/ResultOfTypeOf.js#createFn";
createFn._rdiFn = true;

var MyClass = function MyClass(deps) {
    _classCallCheck(this, MyClass);
};

MyClass._rdiArg = [{
    d2: createFn
}];