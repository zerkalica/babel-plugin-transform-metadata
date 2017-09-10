"use strict";

var A = function A() {};

var B = function B() {};

var MyClass = function MyClass(a, b) {};

MyClass._r = [0, [A, B]];
MyClass.displayName = "MyClass";