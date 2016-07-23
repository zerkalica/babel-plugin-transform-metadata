// @flow

import type { IT } from './imports/ITest';

let MyClass = class MyClass {
    constructor(it: IT) {}
};
Reflect.defineMetadata('design:paramtypes', ['IT'], MyClass);