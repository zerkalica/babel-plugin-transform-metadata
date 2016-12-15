'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var A = function A() {
    _classCallCheck(this, A);
};

var B = function B() {
    _classCallCheck(this, B);
};

var MyClass = function MyClass(a, b) {
    _classCallCheck(this, MyClass);
};

dec2('test')(MyClass, null, 1);
dec1(MyClass, null, 0);
MyClass._rdiArg = [A, B];