/* @flow */

declare function describe(name: string, cb: () => void): void;
declare function it(name: string, cb: (done?: () => void) => void): ?Promise<void>;
