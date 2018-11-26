"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fabric_contract_api_1 = require("fabric-contract-api");
/**
 * Define custom context for commercial paper by extending Fabric ContractAPI's Context class
 */
class TradeContext extends fabric_contract_api_1.Context {
    constructor() {
        super();
    }
}
exports.default = TradeContext;
