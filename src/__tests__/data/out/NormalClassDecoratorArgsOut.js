"use strict";

var A = function A() {};

var B = function B() {};

var MyClass = function MyClass(@dec1
a, @dec2('test')
b) {};

MyClass._r = [0, [A, B]];
MyClass.displayName = "MyClass";