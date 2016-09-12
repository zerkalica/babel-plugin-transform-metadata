// @flow

export default function genericInFunc<C: Object, R: Object>(obj: C, rec: R): C {
    return (0: any);
}
Reflect.defineMetadata("design:subtype", "func", genericInFunc);
Reflect.defineMetadata("design:paramtypes", ["C", "R"], genericInFunc);