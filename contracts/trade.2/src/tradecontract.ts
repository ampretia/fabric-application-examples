/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Fabric smart contract classes
import { Contract, Transaction } from 'fabric-contract-api';
import Commodity from './commodity';
import Owner from './owner';
import TradeContext from './tradecontext';

/**
 * Define basic trade network contract by extending Fabric Contract class
 *
 */
export default class TradeContract extends Contract {

    public constructor() {
        // Unique namespace when multiple contracts per chaincode file
        super('org.example.trade');
    }

    /**
     * A custom context provides easy access to list of all trades
     */
    public createContext() {
        return new TradeContext();
    }

    /**
     * Instantiate to perform any setup of the ledger that might be required.
     * @param {Context} ctx the transaction context
     */
    @Transaction()
    public async instantiate(ctx): Promise<void> {
        // no implementation required with this example
        // this could be where datamigration is required
        console.log('Instantiate the contract');
    }

    @Transaction()
    public async addCommodity(ctx, commodity: Commodity): Promise<void> {
        console.log(`Adding ${commodity.getDescription()}`);
        await ctx.commodityList.addCommodity(commodity);
    }

    /**
     * Track the trade of a commodity from one trader to another
     * @param {Context} ctx the transaction context
     * @param {Trade} trade - Object representing the trade (from JSON)
     * @transaction
     */
    @Transaction()
    public async tradeCommodity(ctx, tradingSymbol: string, newOwnerName: string): Promise<Commodity> {

        const commodity = await ctx.commodityList.getCommodity(tradingSymbol);
        const newOwner = new Owner({name: newOwnerName});

        commodity.setOwner(newOwner);
        await ctx.commodityList.updateCommodity(commodity);
        return commodity;
    }

    @Transaction(false)
    public async getAllCommodities(ctx): Promise<Commodity[]> {
        console.log(`Getting all commodities`);
        return await ctx.commodityList.getAllCommodities();
    }

}
