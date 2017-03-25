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

A.displayName = 'A';
A._r3 = 'babel-plugin-transform-metadata/src/__tests__/data/AllFeatures.js';
dec2({ k: 'test' })(A, null, 1);
dec1(A, null, 0);
A._r1 = [B, 'IT', {
    s: String,
    b: null
}, f];
var createVNode = Inferno.createVNode;

function ComponentD(rec, state, createVNode) {
    return createVNode(2, 'div', null, 'AA');
}

ComponentD.displayName = 'ComponentD';
ComponentD._r3 = 'babel-plugin-transform-metadata/src/__tests__/data/AllFeatures.js';
ComponentD._r2 = 1;
ComponentD._r1 = [{
    s: Number
}];
function factory() {
    return function () {};
}

factory.displayName = 'factory';
factory._r3 = 'babel-plugin-transform-metadata/src/__tests__/data/AllFeatures.js';
factory._r2 = 2;


function fn(a, b, f, sA, saf) {
    function fn2(a) {}
}

fn.displayName = 'fn';
fn._r3 = 'babel-plugin-transform-metadata/src/__tests__/data/AllFeatures.js';
fn._r2 = 2;
fn._r1 = [A, B, factory, {
    _r4: 1,
    v: [A]
}, {
    _r4: 2,
    v: [A, B]
}];
var id = 'IT';