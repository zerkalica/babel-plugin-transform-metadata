var A = function A() {};

A.displayName = "A";

var B = function B() {};

B.displayName = "B";

var MyClass = function MyClass(a, b) {};

MyClass._r = [0, [A, B]];
MyClass.displayName = "MyClass";