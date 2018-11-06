/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Fabric smart contract classes
const { Contract, Context } = require('fabric-contract-api');

class Commodity {

    constructor(obj){
        Object.assign(this,obj);
    }

    getTradeId(){
        return this.tradeId;
    }

    getTradingSymbol(){
        return this.tradingSymbol;
    }

    getDescription(){
        return this.description;
    }

    getQuantity(){
        return this.quantity;
    }

    getOwner(){
        return this.owner;
    }

    static getType(){
        return 'Commodity'
    }

}
/**
 * Define custom context for commercial paper by extending Fabric ContractAPI's Context class
 */
class TradeContext extends Context {

    constructor() {
        super();
    }

}

/**
 * Define commercial paper smart contract by extending Fabric Contract class
 *
 */
class TradeContract extends Contract {

    constructor() {
        // Unique namespace when multiple contracts per chaincode file
        super('org.example.trade');

        console.log(`Process is ${process.pid}`)
    }

    /**
     * A custom context provides easy access to list of all trades
     */
    createContext() {
        return new TradeContext();
    }

    /**
     * Instantiate to perform any setup of the ledger that might be required.
     * @param {Context} ctx the transaction context
     */
    async instantiate(ctx){
        // no implementation required with this example
        // this could be where datamigration is required
        console.log('Instantiate the contract');
    }

    async addCommodity(ctx,commodityJSON){
        console.log(commodityJSON)
        let commodity = new Commodity(JSON.parse(commodityJSON));
        console.log(commodity);
        const key = ctx.stub.createCompositeKey('Commodity',[ commodity.getTradingSymbol(), commodity.getTradeId() ]);
        console.log(key)
        await ctx.stub.putState(key, Buffer.from(JSON.stringify(commodity)));
    }

    /**
     * Track the trade of a commodity from one trader to another
     * @param {Context} ctx the transaction context
     * @param {Trade} trade - Object representing the trade (from JSON)
     * @transaction
     */
    async tradeCommodity(ctx,tradingSymbol,tradeId,newOwner) {
        const ledgerkey = ctx.stub.createCompositeKey(Commodity.getType(), [ tradingSymbol,tradeId ]);
        const data = await ctx.stub.getState(ledgerkey);

        let commodity = new Commodity(JSON.parse(data.toString()));
        commodity.owner = newOwner;
        
        await ctx.stub.putState(ledgerkey, Buffer.from(JSON.stringify(commodity)));
        return commodity;
    }
   
}

module.exports = TradeContract;
