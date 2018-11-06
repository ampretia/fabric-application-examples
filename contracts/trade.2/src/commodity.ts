
'use strict';

import { Asset, Property, State } from 'fabric-contract-api';
import Owner from './owner';

@Asset()
export default class Commodity extends State {

    @Property()
    public tradingSymbol: string;
    @Property()
    public description: string;
    @Property()
    public quantity: number;
    @Property()
    public owner: Owner;

    /**
     * All objects to have single object constructor that takes an object whose propeties will become
     * this
     */
    public constructor(obj: any) {
        super('Commodity.', obj);

        // tell the state parent, which property is to use when adding to the ledger
        this.setKeyParts(['tradingSymbol']);
    }

    public getTradingSymbol(): string {
        return this.tradingSymbol;
    }

    public getDescription(): string {
        return this.description;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public getOwner(): Owner {
        return this.owner;
    }

    public setOwner(owner: Owner) {
        this.owner = owner;
    }
}
