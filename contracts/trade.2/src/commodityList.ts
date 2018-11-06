/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for collections of ledger states --  a state list
import { StateList } from 'fabric-contract-api';
import Commodity from './commodity';

/** Commodity list that puts commodities into the ledger via the statelist */
export default class CommodityList extends StateList {

    constructor(ctx) {
        super(ctx, 'org.example.commoditylist');
    }

    public async addCommodity(commodity: Commodity) {
        return this.addState(commodity);
    }

    public async getCommodity(commodityKey) {
        return this.getState(commodityKey);
    }

    public async updateCommodity(commodity: Commodity) {
        return this.updateState(commodity);
    }
    public async getAllCommodities() {
        return this.getAllStates();
    }
}
