"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fabric_contract_api_1 = require("fabric-contract-api");
const commodityList_1 = require("./commodityList");
/**
 * Define custom context for commercial paper by extending Fabric ContractAPI's Context class
 */
class TradeContext extends fabric_contract_api_1.Context {
    constructor() {
        super();
        this.commodityList = new commodityList_1.default(this);
    }
}
exports.default = TradeContext;
