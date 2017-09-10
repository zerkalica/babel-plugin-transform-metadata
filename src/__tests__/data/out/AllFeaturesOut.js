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

A._r = [0, [B, 'IT', {
    s: String,
    b: null
}, f]];
A.displayName = 'babel-plugin-transform-metadata/src/__tests__/data/AllFeatures.js#A';

function ComponentD(rec, state) {
    return h(
        'div',
        null,
        'AA'
    );
}

ComponentD._r = [1, [{
    s: Number
}]];
ComponentD.displayName = 'babel-plugin-transform-metadata/src/__tests__/data/AllFeatures.js#ComponentD';
function factory() {
    return function () {};
}

factory._r = [2];
factory.displayName = 'babel-plugin-transform-metadata/src/__tests__/data/AllFeatures.js#factory';


function fn(a, b, f, sA, saf) {
    function fn2(a) {}
}

fn._r = [2, [A, B, factory, [1, A], [2, A, B]]];
fn.displayName = 'babel-plugin-transform-metadata/src/__tests__/data/AllFeatures.js#fn';
var id = 'IT';