var A = function A() {};

A.displayName = "A";

function fn(a) {
  function fn2(a) {}
}

fn._r = [2, [A]];
fn.displayName = "fn";