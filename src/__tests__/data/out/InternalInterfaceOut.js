"use strict";

var A = function A() {};

var MyClass = function MyClass(c) {};

MyClass._r = [0, [{
  a: A
}]];
MyClass.displayName = "MyClass";