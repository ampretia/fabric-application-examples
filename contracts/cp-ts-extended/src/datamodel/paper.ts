/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

import { Asset, Property } from 'fabric-contract-api';
import State from '../ledger/state';

// Enumerate commercial paper state values
enum cpState  {
    ISSUED,
    TRADING,
    REDEEMED,
}

/**
 * CommercialPaper class extends State class
 * Class will be used by application and smart contract to define a paper
 */
// @Asset('org.papernet.commercialpaper')
@Asset()
export class CommercialPaper extends State {

    /**
     * Factory method to form back into an object
     */
    public static createInstance(issuer, paperNumber, issueDateTime, maturityDateTime, faceValue) {
        return new CommercialPaper({issuer, paperNumber, issueDateTime, maturityDateTime, faceValue});
    }

    public static getType( ) {
        return 'org.papernet.commercialpaper';
    }

    @Property()
    public issuer: string;

    @Property()
    public owner: string;

    @Property()
    public currentState: any;

    @Property()
    public paperNumber: string;

    @Property()
    public faceValue: number;

    constructor(obj) {
        super(CommercialPaper.getType(), [obj.issuer, obj.paperNumber]);
        Object.assign(this, obj);
    }

    public getIssuer(): string {
        return this.issuer;
    }

    public setIssuer(newIssuer: string) {
        this.issuer = newIssuer;
    }

    public getOwner(): string {
        return this.owner;
    }

    public setOwner(newOwner: string) {
        this.owner = newOwner;
    }

    /**
     * Useful methods to encapsulate commercial paper states
     */
    public setIssued() {
        this.currentState = cpState.ISSUED;
    }

    public setTrading() {
        this.currentState = cpState.TRADING;
    }

    public setRedeemed() {
        this.currentState = cpState.REDEEMED;
    }

    public isIssued() {
        return this.currentState === cpState.ISSUED;
    }

    public isTrading() {
        return this.currentState === cpState.TRADING;
    }

    public isRedeemed() {
        return this.currentState === cpState.REDEEMED;
    }

}
