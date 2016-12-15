'use strict';

var _react = require('react');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var B = function B() {
    _classCallCheck(this, B);
};

var f = 123;

var A = function A(b, e, i, some) {
    _classCallCheck(this, A);
};

A._rdiDbg = 'babel-plugin-transform-metadata/src/__tests__/data/AllFeatures.js#A';
dec2({ k: 'test' })(A, null, 1);
dec1(A, null, 0);
A._rdiArg = [B, 'IT', {
    s: String,
    b: V
}, f];

function ComponentD(rec, state, _t) {
    return _t.h(
        'div',
        null,
        'AA'
    );
}

ComponentD._rdiDbg = 'babel-plugin-transform-metadata/src/__tests__/data/AllFeatures.js#ComponentD';
ComponentD._rdiJsx = true;
ComponentD._rdiArg = [{
    s: Number
}];
function factory() {
    return function () {};
}

factory._rdiDbg = 'babel-plugin-transform-metadata/src/__tests__/data/AllFeatures.js#factory';
factory._rdiFn = true;


function fn(a, b, f) {
    function fn2(a) {}
}

fn._rdiDbg = 'babel-plugin-transform-metadata/src/__tests__/data/AllFeatures.js#fn';
fn._rdiFn = true;
fn._rdiArg = [A, B, factory];
var id = 'IT';