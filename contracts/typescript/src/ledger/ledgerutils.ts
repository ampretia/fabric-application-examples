/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';
import { State } from './state';
import { Context } from 'fabric-contract-api';

/**
 * Utility class for data, object mapulation, e.g. serialization
 *
 */
export class DataUtils {

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

    static deserializeClass(data,objClass) {
        let json = JSON.parse(data.toString());
        let object = new(objClass)(json);
        return object;
    }
}

/**
 * StateList provides a named virtual container for a set of ledger states.
 * Each state has unique key which associates it with the container, rather
 * than the container containing a link to the state. This minimizes collisions
 * for parallel transactions on different states.
 */
export class StateList {

    name: string;
    supportedTypes: object;
    ctx: Context;

    /**
     * Store Fabric context for subsequent API access, and name of list
     */
    constructor(ctx, listName) {
        this.ctx = ctx;
        this.name = listName;
        this.supportedTypes = {};
    }

    /**
     * Add a state to the list. Creates a new state in worldstate with
     * appropriate composite key.  Note that state defines its own key.
     * State object is serialized before writing.
     */
    async addState(state) {
        let key = this.ctx.stub.createCompositeKey(this.name, state.getSplitKey());
        let data = DataUtils.serialize(state);
        await this.ctx.stub.putState(key, data);
    }

    /**
     * Get a state from the list using supplied keys. Form composite
     * keys to retrieve state from world state. State data is deserialized
     * into JSON object before being returned.
     */
    async getState(key) {
        let ledgerkey = this.ctx.stub.createCompositeKey(this.name, State.splitKey(key));
        let data = await this.ctx.stub.getState(ledgerkey);
        let state = DataUtils.deserialize(data,this.supportedTypes);
        return state;
    }

    /**
     * Update a state in the list. Puts the new state in world state with
     * appropriate composite key.  Note that state defines its own key.
     * A state is serialized before writing. Logic is very similar to
     * addState() but kept separate becuase it is semantically distinct.
     */
    async updateState(state) {
        let key = this.ctx.stub.createCompositeKey(this.name, state.getSplitKey());
        let data = DataUtils.serialize(state);
        await this.ctx.stub.putState(key, data);
    }

    /** Stores the type and the deserialization function required */
    use(stateClass){
        this.supportedTypes[stateClass.getType()] = stateClass;
    }

}

