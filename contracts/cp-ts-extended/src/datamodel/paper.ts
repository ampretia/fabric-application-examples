/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

import { State } from '../ledger/state';
import { Asset,Property } from 'fabric-contract-api';

// Enumerate commercial paper state values
enum cpState  {
    ISSUED,
    TRADING,
    REDEEMED
};

/**
 * CommercialPaper class extends State class
 * Class will be used by application and smart contract to define a paper
 */
// @Asset('org.papernet.commercialpaper')
@Asset()
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
   // @Property('issuer')
    getIssuer(): string {
        return this.issuer;
    }

    @Property('issuer','string')
    setIssuer(newIssuer: string) {
        this.issuer = newIssuer;
    }

   // @Property('owner')
    getOwner(): string {
        return this.owner;
    }

    @Property('owner','string')
    setOwner(newOwner: string) {
        this.owner = newOwner;
    }

    /**
     * Useful methods to encapsulate commercial paper states
     */
    @Property('state','cpState')
    setIssued() {
        this.currentState = cpState.ISSUED;
    }

   // @Property('state')
    setTrading() {
        this.currentState = cpState.TRADING;
    }

   // @Property('state')
    setRedeemed() {
        this.currentState = cpState.REDEEMED;
    }

   // @Property('state')
    isIssued() {
        return this.currentState === cpState.ISSUED;
    }

//@Property('state')
    isTrading() {
        return this.currentState === cpState.TRADING;
    }

   // @Property('state')
    isRedeemed() {
        return this.currentState === cpState.REDEEMED;
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

