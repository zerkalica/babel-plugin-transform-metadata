// @flow
import Component from 'inferno-component'
export class Ca extends Component {
  render() {
      <div/>
  }
}

function ComponentA(rec: {p: number}, state: {s: number}, h) {
    return <div onComponentDidMount={ () => {} }><Ca/></div>
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
    return <div className="test"><ComponentA p="123" /><span/></div>
}

const ComponentF = () => <div>qwe</div>

function ComponentG(rec: {p: number}) {
    return <div>{items.map((i) => <div key={i} >{i}</div>)}</div>
}
