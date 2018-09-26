

/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

/**
 * State class. States have a type, unique key, and a lifecycle current state
 * the current state is determined by the specific subclass
 */
export class State {

    type: string;
    currentState: any;
    key: string;

    /**
     * @param {String|Object} type  An indentifiable type of the instance
     * @param {keyParts[]} elements to pull together to make a key for the objects
     */
    constructor(type, keyParts) {
        this.type = type;
        this.key = State.makeKey(keyParts);
        this.currentState = null;
    }

    getType() {
        return this.type;
    }

    getKey() {
        return this.key;
    }

    getSplitKey(){
        return State.splitKey(this.key);
    }

    getCurrentState(){
        return this.currentState;
    }

    /**
     * Serialize commercial paper
     **/
    serialize() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * Join the keyParts to make a unififed string
     * Not comfortable with this particular algorithm
     * @param (String[]) keyParts
     */
    static makeKey(keyParts) {
        return keyParts.map(part => JSON.stringify(part)).join(':');
    }

    static splitKey(key){
        return key.split(':');
    }

}


