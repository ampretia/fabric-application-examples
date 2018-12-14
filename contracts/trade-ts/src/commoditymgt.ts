/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Fabric smart contract classes
import { Context, Contract, Transaction, Returns } from 'fabric-contract-api';
import { ChaincodeResponse } from 'fabric-shim';
import Commodity from './commodity';

/**
 * Additional contract within the 'trade-ts' sample that shows a second use of the contract class
 */
export class CommodityManagementContract extends Contract {

    constructor() {
        // Unique namespace when multiple contracts per chaincode file
        super('org.example.commoditymgt');
    }

    @Transaction()
    public async setCommodityDescription(ctx: Context, tradingSymbol: string, description: string) {
        const key = ctx.stub.createCompositeKey('CommodityMgt', [tradingSymbol]);
        const commodity = { tradingSymbol, description };

        await ctx.stub.putState(key, Buffer.from(JSON.stringify(commodity)));
    }

    /**
     * Gets the description
     */
    @Transaction(false)
    public async getCommodityDescription(ctx: Context, tradingSymbol: string) {
        const ledgerkey = ctx.stub.createCompositeKey('CommodityMgt', [tradingSymbol]);
        const data = await ctx.stub.getState(ledgerkey);

        const commodity = JSON.parse(data.toString('utf8'));
        return commodity.description;
    }

    @Transaction(false)
    @Returns('string')
    public async getMessage(ctx: Context): Promise<string> {
        let response: ChaincodeResponse;
        response = await ctx.stub.invokeChaincode('hellonet', ['Greeting:getGreetingText'], 'mychannel');

        console.log(`Status: ${response.status}`);
        console.log(`Payload: ${response.payload.toString('utf8')}`);
        return response.payload.toString('utf8');
    }
}
