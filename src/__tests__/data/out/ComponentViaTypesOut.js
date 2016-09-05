// @flow

import { Component, NonComponent as Some } from 'fake-react';
import { Component as C } from 'fake-react';
import { Component as ReactComponent } from 'react';
import React from 'react';

interface State {
    p: number
}

let ComponentA = class ComponentA extends Component<Props, State> {};
Reflect.defineMetadata('design:paramtypes', [{
    p: Number
}], ComponentA);
let ComponentB = class ComponentB extends C<Props, { p: number }> {};
Reflect.defineMetadata('design:paramtypes', [{
    p: Number
}], ComponentB);
let ComponentC = class ComponentC extends Some<Props, State> {};
let ComponentD = class ComponentD extends ReactComponent<Props, Props, State> {};
Reflect.defineMetadata('design:paramtypes', [{
    p: Number
}], ComponentD);
let ComponentE = class ComponentE extends React.Component<Props, Props, State> {};
Reflect.defineMetadata('design:paramtypes', [{
    p: Number
}], ComponentE);