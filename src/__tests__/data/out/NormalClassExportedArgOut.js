"use strict";

exports.__esModule = true;
exports.default = exports.B = exports.A = void 0;

var A = function A() {};

exports.A = A;
A.displayName = "A";

var B = function cB() {};

exports.B = B;

var MyClass = function MyClass(a, b) {};

exports.default = MyClass;
MyClass._r = [0, [A, B]];
MyClass.displayName = "MyClass";