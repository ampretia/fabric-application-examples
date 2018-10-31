import State from './state';

/*
SPDX-License-Identifier: Apache-2.0
*/

/**
 * State class. States have a type, unique key, and a lifecycle current state
 * the current state is determined by the specific subclass
 */
export default interface ISerializer {

    use(stateclass: object, type: string): void;

    fromBuffer(buffer: Buffer): State;

    toBuffer(state: State): Buffer;

}
