"use strict";

exports.__esModule = true;
exports.Ca = undefined;

var _infernoComponent = require("inferno-component");

var _infernoComponent2 = _interopRequireDefault(_infernoComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var createVNode = Inferno.createVNode;

var Ca = exports.Ca = function (_Component) {
    _inherits(Ca, _Component);

    function Ca() {
        _classCallCheck(this, Ca);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Ca.prototype.render = function render(props, state, createVNode) {
        createVNode(2, "div");
    };

    return Ca;
}(_infernoComponent2.default);

function ComponentA(rec, state, h) {
    return createVNode(2, "div", null, createVNode(16, Ca), {
        "onComponentDidMount": function onComponentDidMount() {}
    });
}

ComponentA.displayName = "ComponentA";
ComponentA._r3 = "babel-plugin-transform-metadata/src/__tests__/data/JSXClass.js";
ComponentA._r2 = 1;
ComponentA._r1 = [{
    s: Number
}];
var ComponentB = function ComponentB(props, state, createVNode) {
    return createVNode(2, "div", null, "qwe");
};

ComponentB.displayName = "ComponentB";
ComponentB._r3 = "babel-plugin-transform-metadata/src/__tests__/data/JSXClass.js";
ComponentB._r2 = 1;
ComponentB._r1 = [{
    s: Number
}];
var ComponentC = function ComponentC(props, state, createVNode) {

    var b = function b() {
        a: [createVNode(2, "div", null, "E")];
    };

    b.displayName = "b";
    b._r3 = "babel-plugin-transform-metadata/src/__tests__/data/JSXClass.js";
    b._r2 = 2;
    return createVNode(2, "div");
};

ComponentC.displayName = "ComponentC";
ComponentC._r3 = "babel-plugin-transform-metadata/src/__tests__/data/JSXClass.js";
ComponentC._r2 = 1;
ComponentC._r1 = [{
    ss: Number
}];
function ComponentE(props, state, createVNode) {
    var b = function b() {
        a: [createVNode(2, "div", null, "E")];
    };
    b.displayName = "b";
    b._r3 = "babel-plugin-transform-metadata/src/__tests__/data/JSXClass.js";
    b._r2 = 2;
}

ComponentE.displayName = "ComponentE";
ComponentE._r3 = "babel-plugin-transform-metadata/src/__tests__/data/JSXClass.js";
ComponentE._r2 = 1;
function ComponentD(rec, state, createVNode) {
    return createVNode(2, "div", {
        "className": "test"
    }, [createVNode(16, ComponentA, {
        "p": "123"
    }), createVNode(2, "span")]);
}

ComponentD.displayName = "ComponentD";
ComponentD._r3 = "babel-plugin-transform-metadata/src/__tests__/data/JSXClass.js";
ComponentD._r2 = 1;
var ComponentF = function ComponentF(props, state, createVNode) {
    return createVNode(2, "div", null, "qwe");
};

ComponentF.displayName = "ComponentF";
ComponentF._r3 = "babel-plugin-transform-metadata/src/__tests__/data/JSXClass.js";
ComponentF._r2 = 1;
function ComponentG(rec, state, createVNode) {
    return createVNode(2, "div", null, items.map(function (i) {
        return createVNode(2, "div", null, i, null, i);
    }));
}
ComponentG.displayName = "ComponentG";
ComponentG._r3 = "babel-plugin-transform-metadata/src/__tests__/data/JSXClass.js";
ComponentG._r2 = 1;