/*
SPDX-License-Identifier: Apache-2.0
*/
'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Fabric smart contract classes
const fabric_contract_api_1 = require("fabric-contract-api");
const commodity_1 = require("./commodity");
const owner_1 = require("./owner");
const tradecontext_1 = require("./tradecontext");
/**
 * Define basic trade network contract by extending Fabric Contract class
 *
 */
class TradeContract extends fabric_contract_api_1.Contract {
    constructor() {
        // Unique namespace when multiple contracts per chaincode file
        super('org.example.trade');
    }
    /**
     * A custom context provides easy access to list of all trades
     */
    createContext() {
        return new tradecontext_1.default();
    }
    /**
     * Instantiate to perform any setup of the ledger that might be required.
     * @param {Context} ctx the transaction context
     */
    async instantiate(ctx) {
        // no implementation required with this example
        // this could be where datamigration is required
        console.log('Instantiate the contract');
    }
    async addCommodity(ctx, commodity) {
        console.log(`Adding ${commodity.getDescription()}`);
        await ctx.commodityList.addCommodity(commodity);
    }
    /**
     * Track the trade of a commodity from one trader to another
     * @param {Context} ctx the transaction context
     * @param {Trade} trade - Object representing the trade (from JSON)
     * @transaction
     */
    async tradeCommodity(ctx, tradingSymbol, newOwnerName) {
        const commodity = await ctx.commodityList.getCommodity(tradingSymbol);
        const newOwner = new owner_1.default({ name: newOwnerName });
        commodity.setOwner(newOwner);
        await ctx.commodityList.updateCommodity(commodity);
        return commodity;
    }
    async getAllCommodities(ctx) {
        console.log(`Getting all commodities`);
        return await ctx.commodityList.getAllCommodities();
    }
}
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TradeContract.prototype, "instantiate", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, commodity_1.default]),
    __metadata("design:returntype", Promise)
], TradeContract.prototype, "addCommodity", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], TradeContract.prototype, "tradeCommodity", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TradeContract.prototype, "getAllCommodities", null);
exports.default = TradeContract;
