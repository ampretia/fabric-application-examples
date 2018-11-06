/*
SPDX-License-Identifier: Apache-2.0
*/
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// Utility class for collections of ledger states --  a state list
const fabric_contract_api_1 = require("fabric-contract-api");
/** Commodity list that puts commodities into the ledger via the statelist */
class CommodityList extends fabric_contract_api_1.StateList {
    constructor(ctx) {
        super(ctx, 'org.example.commoditylist');
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
    async getAllCommodities() {
        return this.getAllStates();
    }
}
exports.default = CommodityList;
