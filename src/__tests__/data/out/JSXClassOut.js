"use strict";

function ComponentA(rec, state, h) {
    return _t.h(
        "div",
        null,
        "AA"
    );
}

ComponentA._rdiDbg = "babel-plugin-transform-metadata/src/__tests__/data/JSXClass.js#ComponentA";
ComponentA._rdiJsx = true;
ComponentA._rdiArg = [{
    s: Number
}];
var ComponentB = function ComponentB(props, state, _t) {
    return _t.h(
        "div",
        null,
        "qwe"
    );
};

ComponentB._rdiDbg = "babel-plugin-transform-metadata/src/__tests__/data/JSXClass.js#ComponentB";
ComponentB._rdiJsx = true;
ComponentB._rdiArg = [{
    s: Number
}];
var ComponentC = function ComponentC(props, state, _t) {

    var b = function b() {
        a: [_t.h(
            "div",
            null,
            "E"
        )];
    };

    b._rdiDbg = "babel-plugin-transform-metadata/src/__tests__/data/JSXClass.js#b";
    b._rdiFn = true;
    return _t.h("div", null);
};

ComponentC._rdiDbg = "babel-plugin-transform-metadata/src/__tests__/data/JSXClass.js#ComponentC";
ComponentC._rdiJsx = true;
ComponentC._rdiArg = [{
    ss: Number
}];
function ComponentE(props, state, _t) {
    var b = function b() {
        a: [_t.h(
            "div",
            null,
            "E"
        )];
    };
    b._rdiDbg = "babel-plugin-transform-metadata/src/__tests__/data/JSXClass.js#b";
    b._rdiFn = true;
}

ComponentE._rdiDbg = "babel-plugin-transform-metadata/src/__tests__/data/JSXClass.js#ComponentE";
ComponentE._rdiJsx = true;
function ComponentD(rec, state, _t) {
    return _t.h(
        "div",
        null,
        "AA"
    );
}

ComponentD._rdiDbg = "babel-plugin-transform-metadata/src/__tests__/data/JSXClass.js#ComponentD";
ComponentD._rdiJsx = true;
var ComponentF = function ComponentF(props, state, _t) {
    return _t.h(
        "div",
        null,
        "qwe"
    );
};

ComponentF._rdiDbg = "babel-plugin-transform-metadata/src/__tests__/data/JSXClass.js#ComponentF";
ComponentF._rdiJsx = true;
function ComponentG(rec, state, _t) {
    return _t.h(
        "div",
        null,
        items.map(function (i) {
            return _t.h(
                "div",
                null,
                i
            );
        })
    );
}
ComponentG._rdiDbg = "babel-plugin-transform-metadata/src/__tests__/data/JSXClass.js#ComponentG";
ComponentG._rdiJsx = true;