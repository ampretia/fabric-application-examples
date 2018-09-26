/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

import { State } from '../ledger/state';
import { DataUtils } from '../ledger/ledgerutils.js';

// Enumerate commercial paper state values
const cpState = {
    ISSUED: 1,
    TRADING: 2,
    REDEEMED: 3
};

/**
 * CommercialPaper class extends State class
 * Class will be used by application and smart contract to define a paper
 */
export class CommercialPaper extends State {

    issuer: string;
    owner: string;
    currentState: any;

    constructor(obj){
        super(CommercialPaper.getType(), [obj.issuer, obj.paperNumber]);
        Object.assign(this,obj);
    }

    /**
     * Basic getters and setters
    */
    getIssuer() {
        return this.issuer;
    }

    setIssuer(newIssuer) {
        this.issuer = newIssuer;
    }

    getOwner() {
        return this.owner;
    }

    setOwner(newOwner) {
        this.owner = newOwner;
    }

    /**
     * Useful methods to encapsulate commercial paper states
     */
    setIssued() {
        this.currentState = cpState.ISSUED;
    }

    setTrading() {
        this.currentState = cpState.TRADING;
    }

    setRedeemed() {
        this.currentState = cpState.REDEEMED;
    }

    isIssued() {
        return this.currentState === cpState.ISSUED;
    }

    isTrading() {
        return this.currentState === cpState.TRADING;
    }

    isRedeemed() {
        return this.currentState === cpState.REDEEMED;
    }

    /**
     * Deserialize from a buffer the object
     *
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return DataUtils.deserializeClass(data,CommercialPaper);
    }

    /**
     * Factory method to form back into an object
     */
    static createInstance(issuer, paperNumber, issueDateTime, maturityDateTime, faceValue){
        return new CommercialPaper({issuer, paperNumber, issueDateTime, maturityDateTime, faceValue});
    }

    static getType( ){
        return 'org.papernet.commercialpaper';
    }


}

