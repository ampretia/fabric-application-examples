/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Fabric smart contract classes
import { Context, Contract, Transaction } from 'fabric-contract-api';
import Commodity from './commodity';
import TradeContext from './tradeContext';

/**
 * Define commercial paper smart contract by extending Fabric Contract class
 *
 */
export class TradeContract extends Contract {

    constructor() {
        // Unique namespace when multiple contracts per chaincode file
        super('org.example.trade');
    }

    /**
     * A custom context provides easy access to list of all trades
     */
    public createContext() {
        return new TradeContext();
    }

    @Transaction()
    public async addCommodity(ctx, commodity: Commodity) {
        console.log(commodity);
        // const commodity = new Commodity(JSON.parse(commodityJSON));
        // console.log(commodity);
        const key = ctx.stub.createCompositeKey('Commodity', [ commodity.getTradingSymbol(), commodity.getTradeId() ]);
        console.log(key);
        await ctx.stub.putState(key, Buffer.from(JSON.stringify(commodity)));
    }

    /**
     * Track the trade of a commodity from one trader to another
     * @param {Context} ctx the transaction context
     * @param {Trade} trade - Object representing the trade (from JSON)
     * @transaction
     */
    @Transaction()
    public async tradeCommodity(ctx, tradingSymbol: string, tradeId: string, newOwner: string) {
        const ledgerkey = ctx.stub.createCompositeKey(Commodity.getType(), [ tradingSymbol, tradeId ]);
        const data = await ctx.stub.getState(ledgerkey);

        const commodity = new Commodity(JSON.parse(data.toString()));
        commodity.owner = newOwner;

        await ctx.stub.putState(ledgerkey, Buffer.from(JSON.stringify(commodity)));
        return commodity;
    }

}
