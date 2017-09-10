"use strict";

var _react = require("react");

var B = function B() {};

var f = 123;

var A = function A(@dec1
b, @dec2({
  k: 'test'
})
e, i, some) {};

A._r = [0, [B, "IT", {
  s: String,
  b: null
}, f]];
A.displayName = "A";

function ComponentD(rec, state) {
  return React.createElement("div", null, "AA");
}

ComponentD._r = [1, [{
  s: Number
}]];
ComponentD.displayName = "ComponentD";

function factory() {
  return function () {};
}

factory._r = [2];
factory.displayName = "factory";

function fn(a, b, f, sA, saf) {
  function fn2(a) {}
}

fn._r = [2, [A, B, factory, [1, A], [2, A, B]]];
fn.displayName = "fn";
var id = "IT";