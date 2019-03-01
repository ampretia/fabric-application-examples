/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Fabric smart contract classes
import { Context, Contract, Transaction } from 'fabric-contract-api';
import { CommodityManagementContract } from './commoditymgt';

/**
 * Additional contract within the 'trade-ts' sample that shows a second use of the contract class
 */
export class LifecycleContract extends Contract {

    constructor() {
        // Unique namespace when multiple contracts per chaincode file
        super('org.example.lifecycle');
    }

    /**
     * Instantiate to perform any setup of the ledger that might be required.
     * @param {Context} ctx the transaction context
     */
    @Transaction()
    public async instantiate(ctx: Context) {
        console.log('Instantiate the contract');
        const mgt = new CommodityManagementContract();

        await mgt.setCommodityDescription(ctx, 'au', 'GOLD');
        await mgt.setCommodityDescription(ctx, 'ag', 'SILVER');
        await mgt.setCommodityDescription(ctx, 'fe', 'IRON');
        await mgt.setCommodityDescription(ctx, 'al', 'ALUMINIUM');
        // need to call the commodity management to establish the trading symbol description mapping

    }

}
