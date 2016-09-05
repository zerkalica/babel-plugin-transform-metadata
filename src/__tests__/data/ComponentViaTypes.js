// @flow

import {Component, NonComponent as Some} from 'fake-react'
import {Component as C} from 'fake-react'
import {Component as ReactComponent} from 'react'
import React from 'react'

interface State {
    p: number;
}

class ComponentA extends Component<Props, State> {}
class ComponentB extends C<Props, {p: number}> {}
class ComponentC extends Some<Props, State> {}
class ComponentD extends ReactComponent<Props, Props, State> {}
class ComponentE extends React.Component<Props, Props, State> {}
