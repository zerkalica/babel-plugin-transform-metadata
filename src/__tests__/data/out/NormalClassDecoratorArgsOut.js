var A = function A() {};

A.displayName = "A";

var B = function B() {};

B.displayName = "B";

var MyClass = function MyClass(@dec1
a, @dec2('test')
b) {};

MyClass._r = [0, [A, B]];
MyClass.displayName = "MyClass";