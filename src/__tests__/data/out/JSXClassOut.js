"use strict";

exports.__esModule = true;
exports.Ca = void 0;

var _react = require("react");

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Ca = exports.Ca = function (_Component) {
  _inheritsLoose(Ca, _Component);

  function Ca() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Ca.prototype;

  _proto.render = function render() {
    React.createElement("div", null);
  };

  return Ca;
}(_react.Component);

function ComponentA(rec, state, h) {
  return React.createElement("div", {
    onComponentDidMount: function onComponentDidMount() {}
  }, React.createElement(Ca, null));
}

ComponentA._r = [1, [{
  s: Number
}]];
ComponentA.displayName = "ComponentA";

var ComponentB = function ComponentB(props, state) {
  return React.createElement("div", null, "qwe");
};

ComponentB._r = [1, [{
  s: Number
}]];
ComponentB.displayName = "ComponentB";

var ComponentC = function ComponentC(props, state) {
  var b = function b() {
    a: [React.createElement("div", null, "E")];
  };

  b._r = [2];
  b.displayName = "b";
  return React.createElement("div", null);
};

ComponentC._r = [1, [{
  ss: Number
}]];
ComponentC.displayName = "ComponentC";

function ComponentE() {
  var b = function b() {
    a: [React.createElement("div", null, "E")];
  };

  b._r = [2];
  b.displayName = "b";
}

ComponentE._r = [1];
ComponentE.displayName = "ComponentE";

function ComponentD(rec) {
  return React.createElement("div", {
    className: "test"
  }, React.createElement(ComponentA, {
    p: "123"
  }), React.createElement("span", null));
}

ComponentD._r = [1];
ComponentD.displayName = "ComponentD";

var ComponentF = function ComponentF() {
  return React.createElement("div", null, "qwe");
};

ComponentF._r = [1];
ComponentF.displayName = "ComponentF";

function ComponentG(rec) {
  return React.createElement("div", null, items.map(function (i) {
    return React.createElement("div", {
      key: i
    }, i);
  }));
}

ComponentG._r = [1];
ComponentG.displayName = "ComponentG";