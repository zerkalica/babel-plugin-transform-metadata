"use strict";

exports.__esModule = true;
exports.Ca = undefined;

var _react = require("react");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ca = exports.Ca = function (_Component) {
    _inherits(Ca, _Component);

    function Ca() {
        _classCallCheck(this, Ca);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Ca.prototype.render = function render() {
        h("div", null);
    };

    return Ca;
}(_react.Component);

function ComponentA(rec, state, h) {
    return h(
        "div",
        { onComponentDidMount: function onComponentDidMount() {} },
        h(Ca, null)
    );
}

ComponentA._r = [1, [{
    s: Number
}]];
ComponentA.displayName = "babel-plugin-transform-metadata/src/__tests__/data/JSXClass.js#ComponentA";
var ComponentB = function ComponentB(props, state) {
    return h(
        "div",
        null,
        "qwe"
    );
};

ComponentB._r = [1, [{
    s: Number
}]];
ComponentB.displayName = "babel-plugin-transform-metadata/src/__tests__/data/JSXClass.js#ComponentB";
var ComponentC = function ComponentC(props, state) {

    var b = function b() {
        a: [h(
            "div",
            null,
            "E"
        )];
    };

    b._r = [2];
    b.displayName = "babel-plugin-transform-metadata/src/__tests__/data/JSXClass.js#b";
    return h("div", null);
};

ComponentC._r = [1, [{
    ss: Number
}]];
ComponentC.displayName = "babel-plugin-transform-metadata/src/__tests__/data/JSXClass.js#ComponentC";
function ComponentE() {
    var b = function b() {
        a: [h(
            "div",
            null,
            "E"
        )];
    };
    b._r = [2];
    b.displayName = "babel-plugin-transform-metadata/src/__tests__/data/JSXClass.js#b";
}

ComponentE._r = [1];
ComponentE.displayName = "babel-plugin-transform-metadata/src/__tests__/data/JSXClass.js#ComponentE";
function ComponentD(rec) {
    return h(
        "div",
        { className: "test" },
        h(ComponentA, { p: "123" }),
        h("span", null)
    );
}

ComponentD._r = [1];
ComponentD.displayName = "babel-plugin-transform-metadata/src/__tests__/data/JSXClass.js#ComponentD";
var ComponentF = function ComponentF() {
    return h(
        "div",
        null,
        "qwe"
    );
};

ComponentF._r = [1];
ComponentF.displayName = "babel-plugin-transform-metadata/src/__tests__/data/JSXClass.js#ComponentF";
function ComponentG(rec) {
    return h(
        "div",
        null,
        items.map(function (i) {
            return h(
                "div",
                { key: i },
                i
            );
        })
    );
}
ComponentG._r = [1];
ComponentG.displayName = "babel-plugin-transform-metadata/src/__tests__/data/JSXClass.js#ComponentG";