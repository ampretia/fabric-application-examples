import { Object, Property } from 'fabric-contract-api';

@Object()
export default class Commodity {

    public static getType() {
        return 'Commodity';
    }

    @Property()
    public tradeId: string;

    @Property()
    public tradingSymbol: string;

    @Property()
    public description: string;

    @Property()
    public quantity: number;

    @Property()
    public owner: string;

    constructor(obj:Commodity) {
        (<any>Object).assign(this, obj);
    }

    public getTradeId() {
        return this.tradeId;
    }

    public getTradingSymbol() {
        return this.tradingSymbol;
    }

    public getDescription() {
        return this.description;
    }

    public getQuantity() {
        return this.quantity;
    }

    public getOwner() {
        return this.owner;
    }

}
