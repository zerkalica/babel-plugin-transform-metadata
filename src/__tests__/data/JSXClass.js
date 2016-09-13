// @flow

function ComponentA(rec: {p: number}, state: {s: number}, h) {
    return <div>AA</div>
}

const ComponentB = (props, state: {s: number}) => <div>qwe</div>

const ComponentC = function ComponentC(props, state: {ss: number}) {

    const b = () => {a: [<div>E</div>]}

    return <div></div>
}

function ComponentE() {
    const b = () => {a: [<div>E</div>]}
}

function ComponentD(rec: {p: number}) {
    return <div>AA</div>
}

const ComponentF = () => <div>qwe</div>

function ComponentG(rec: {p: number}) {
    return <div>{items.map((i) => <div>{i}</div>)}</div>
}
