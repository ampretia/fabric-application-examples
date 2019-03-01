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
/**
 * Additional contract within the 'trade-ts' sample that shows a second use of the contract class
 */
class CommodityManagementContract extends fabric_contract_api_1.Contract {
    constructor() {
        // Unique namespace when multiple contracts per chaincode file
        super('org.example.commoditymgt');
    }
    async setCommodityDescription(ctx, tradingSymbol, description) {
        const key = ctx.stub.createCompositeKey('CommodityMgt', [tradingSymbol]);
        const commodity = { tradingSymbol, description };
        await ctx.stub.putState(key, Buffer.from(JSON.stringify(commodity)));
    }
    /**
     * Gets the description
     */
    async getCommodityDescription(ctx, tradingSymbol) {
        const ledgerkey = ctx.stub.createCompositeKey('CommodityMgt', [tradingSymbol]);
        const data = await ctx.stub.getState(ledgerkey);
        const commodity = JSON.parse(data.toString('utf8'));
        return commodity.description;
    }
    async getMessage(ctx) {
        let response;
        response = await ctx.stub.invokeChaincode('hellonet', ['Greeting:getGreetingText'], 'mychannel');
        console.log(`Status: ${response.status}`);
        console.log(`Payload: ${response.payload.toString('utf8')}`);
        return response.payload.toString('utf8');
    }
}
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], CommodityManagementContract.prototype, "setCommodityDescription", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], CommodityManagementContract.prototype, "getCommodityDescription", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], CommodityManagementContract.prototype, "getMessage", null);
exports.CommodityManagementContract = CommodityManagementContract;
