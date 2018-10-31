/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Fabric smart contract classes
const { Contract, Context } = require('fabric-contract-api');

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
        
        let commodity = new Commodity(JSON.parse(commodityJSON));
        const key = this.ctx.stub.createCompositeKey(this.name,[ commodity.getTradingSymbol() ]);

        await this.ctx.stub.putState(key, Buffer.from(JSON.stringify(commodity)));
    }

    /**
     * Track the trade of a commodity from one trader to another
     * @param {Context} ctx the transaction context
     * @param {Trade} trade - Object representing the trade (from JSON)
     * @transaction
     */
    async tradeCommodity(ctx,tradingSymbol,newOwner) {
        const ledgerkey = this.ctx.stub.createCompositeKey(this.name, [ tradingSymbol ]);
        const data = await this.ctx.stub.getState(ledgerkey);

        let commodity = new Commodity(JSON.parse(data.toString()));
        commodity.owner = newOwner();

        await this.ctx.stub.putState(ledgerkey, Buffer.from(JSON.stringify(commodity)));
    }
   
}

module.exports = Trade;
