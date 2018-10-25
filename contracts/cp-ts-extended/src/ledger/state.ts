
/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

/**
 * State class. States have a type, unique key, and a lifecycle current state
 * the current state is determined by the specific subclass
 */
export default class State {

    /**
     * Join the keyParts to make a unififed string
     * Not comfortable with this particular algorithm
     * @param (String[]) keyParts
     */
    public static makeKey(keyParts) {
        return keyParts.map((part) => JSON.stringify(part)).join(':');
    }

    public static splitKey(key) {
        return key.split(':');
    }

    public type: string;
    public currentState: any;
    public key: string;

    /**
     * @param {String|Object} type  An indentifiable type of the instance
     * @param {keyParts[]} elements to pull together to make a key for the objects
     */
    constructor(type, keyParts) {
        this.type = type;
        this.key = State.makeKey(keyParts);
        this.currentState = null;
    }

    public getType() {
        return this.type;
    }

    public getKey() {
        return this.key;
    }

    public getSplitKey() {
        return State.splitKey(this.key);
    }

    public getCurrentState() {
        return this.currentState;
    }

}
