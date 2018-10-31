/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';
import { Context } from 'fabric-contract-api';
import ISerializer from './serializer';
import State from './state';
import StateSerializerFactory from './StateSerializerFactory';

/**
 * StateList provides a named virtual container for a set of ledger states.
 * Each state has unique key which associates it with the container, rather
 * than the container containing a link to the state. This minimizes collisions
 * for parallel transactions on different states.
 */
export class StateList {

    public name: string;
    public ctx: Context;
    public serializer: ISerializer;

    /**
     * Store Fabric context for subsequent API access, and name of list
     */
    constructor(ctx, listName) {
        this.ctx = ctx;
        this.name = listName;
        this.serializer = StateSerializerFactory.getLedgerSerializer();
    }

    /**
     * Add a state to the list. Creates a new state in worldstate with
     * appropriate composite key.  Note that state defines its own key.
     * State object is serialized before writing.
     */
    public async addState(state) {
        const key = this.ctx.stub.createCompositeKey(this.name, state.getSplitKey());
        const data = this.serializer.toBuffer(state);
        await this.ctx.stub.putState(key, data);
    }

    /**
     * Get a state from the list using supplied keys. Form composite
     * keys to retrieve state from world state. State data is deserialized
     * into JSON object before being returned.
     */
    public async getState(key) {
        const ledgerkey = this.ctx.stub.createCompositeKey(this.name, State.splitKey(key));
        const data = await this.ctx.stub.getState(ledgerkey);
        const state = this.serializer.fromBuffer(data);
        return state;
    }

    /**
     * Update a state in the list. Puts the new state in world state with
     * appropriate composite key.  Note that state defines its own key.
     * A state is serialized before writing. Logic is very similar to
     * addState() but kept separate becuase it is semantically distinct.
     */
    public async updateState(state) {
        const key = this.ctx.stub.createCompositeKey(this.name, state.getSplitKey());
        const data = this.serializer.toBuffer(state);
        await this.ctx.stub.putState(key, data);
    }

    /** Stores the type and the deserialization function required
     * Useful for subclasses of this to hid the details.
     */
    public use(stateClass: object, type: string) {
        this.serializer.use(stateClass, type);
    }

}
