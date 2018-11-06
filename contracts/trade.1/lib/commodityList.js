/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for collections of ledger states --  a state list
const { StateList } = require('fabric-contract-api');
const Commodity = require('./commodity.js');

module.exports = class CommodityList extends StateList {

    constructor(ctx) {
        super(ctx, 'org.example.commoditylist');
        this.use(Commodity);
    }

    async addCommodity(commodity) {
        return this.addState(commodity);
    }

    async getCommodity(commodityKey) {
        return this.getState(commodityKey);
    }

    async updateCommodity(commodity) {
        return this.updateState(commodity);
    }
};

