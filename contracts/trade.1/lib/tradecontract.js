/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Fabric smart contract classes
const { Contract, Context } = require('fabric-contract-api');
const CommodityList = require('./commodityList.js');
/**
 * Define custom context for commercial paper by extending Fabric ContractAPI's Context class
 */
class TradeContext extends Context {

    constructor() {
        super();
        this.commodityList = new CommodityList(this);
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

    async addCommodity(ctx,commodity){
        console.log(`Adding ${commodity.getDescription()}`);
        await this.ctx.commodityList.addCommodity(commodity);
    }

    /**
     * Track the trade of a commodity from one trader to another
     * @param {Context} ctx the transaction context
     * @param {Trade} trade - Object representing the trade (from JSON)
     * @transaction
     */
    async tradeCommodity(ctx,tradingSymbol,newOwner) {

        let commodity = await this.ctx.commodityList.getCommodityByKey(tradingSymbol);
        commodity.setOwner(newOwner);
        await this.ctx.commodityList.updateCommodity(commodity);
        return commodity;
    }

}

module.exports = TradeContract;
