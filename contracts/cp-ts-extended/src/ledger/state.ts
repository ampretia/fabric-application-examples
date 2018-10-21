

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
     * Serialize state
     **/
    serialize() {
        return State.serialize(this);
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

    /**
     * Convert object to buffer containing JSON data serialization
     * Typically used before putState()ledger API
     * @param {Object} JSON object to serialize
     * @return {buffer} buffer with the data to store
     */
    static serialize(object) {
        return Buffer.from(JSON.stringify(object));
    }

    /**
     * Deserialize object, i.e. Covert serialized data to JSON object
     * Typically used after getState() ledger API
     * @param {data} data to deserialize into JSON object
     * @return {json} json with the data to store
     */
    static deserialize(data,supportedTypes) {
        let json = JSON.parse(data.toString());
        let objClass = supportedTypes[json.type];
        if (!objClass){
            throw new Error(`Unknown type of ${json.type}`);
        }
        let object = new(objClass)(json);

        return object;
    }

    /**
     *
     */
    static deserializeClass(data,objClass) {
        let json = JSON.parse(data.toString());
        let object = new(objClass)(json);
        return object;
    }
}


