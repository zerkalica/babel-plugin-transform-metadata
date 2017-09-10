"use strict";

var FN = function FN() {}; // type FN = typeof FN


function createFn() {
  return function (a) {};
}

createFn._r = [2];
createFn.displayName = "createFn";

var MyClass = function MyClass(deps) {};

MyClass._r = [0, [{
  d2: createFn
}]];
MyClass.displayName = "MyClass";