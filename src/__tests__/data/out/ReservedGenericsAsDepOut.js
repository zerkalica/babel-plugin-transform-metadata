var B = function B() {};

B.displayName = "B";

var FN = function FN() {}; // type FN = typeof FN


function createFn() {
  return function (a) {};
}

createFn._r = [2];
createFn.displayName = "createFn";

var MyClass = function MyClass(deps, b, d) {};

MyClass._r = [0, [{
  b: B,
  r: B,
  f: FN,
  d: createFn,
  d2: createFn
}, B, FN]];
MyClass.displayName = "MyClass";