"use strict";

exports.__esModule = true;
exports.Ca = void 0;

var _react = require("react");

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Ca =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Ca, _Component);

  function Ca() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Ca.prototype;

  _proto.render = function render() {
    lom_h("div", null);
  };

  return Ca;
}(_react.Component);

exports.Ca = Ca;
Ca.displayName = "Ca";

function ComponentA(rec, state, h) {
  return lom_h("div", {
    onComponentDidMount: function onComponentDidMount() {}
  }, lom_h(Ca, null));
}

ComponentA._r = [1, [{
  s: Number
}]];
ComponentA.displayName = "ComponentA";

var ComponentB = function ComponentB(props, state) {
  return lom_h("div", null, "qwe");
};

ComponentB._r = [1, [{
  s: Number
}]];
ComponentB.displayName = "ComponentB";

var ComponentC = function ComponentC(props, state) {
  var b = function b() {
    a: [lom_h("div", null, "E")];
  };

  b._r = [2];
  b.displayName = "b";
  return lom_h("div", null);
};

ComponentC._r = [1, [{
  ss: Number
}]];
ComponentC.displayName = "ComponentC";

function ComponentE() {
  var b = function b() {
    a: [lom_h("div", null, "E")];
  };

  b._r = [2];
  b.displayName = "b";
}

ComponentE._r = [1];
ComponentE.displayName = "ComponentE";

function ComponentD(rec) {
  return lom_h("div", {
    className: "test"
  }, lom_h(ComponentA, {
    p: "123"
  }), lom_h("span", null));
}

ComponentD._r = [1];
ComponentD.displayName = "ComponentD";

var ComponentF = function ComponentF() {
  return lom_h("div", null, "qwe");
};

ComponentF._r = [1];
ComponentF.displayName = "ComponentF";

function ComponentG(rec) {
  return lom_h("div", null, items.map(function (i) {
    return lom_h("div", {
      key: i
    }, i);
  }));
}

ComponentG._r = [1];
ComponentG.displayName = "ComponentG";