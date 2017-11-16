var A = function A() {};

A.displayName = "A";

var MyClass = function MyClass(c) {};

MyClass._r = [0, [{
  a: A
}]];
MyClass.displayName = "MyClass";