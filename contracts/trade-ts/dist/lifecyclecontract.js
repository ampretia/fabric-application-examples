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
const commoditymgt_1 = require("./commoditymgt");
/**
 * Additional contract within the 'trade-ts' sample that shows a second use of the contract class
 */
class LifecycleContract extends fabric_contract_api_1.Contract {
    constructor() {
        // Unique namespace when multiple contracts per chaincode file
        super('org.example.lifecycle');
    }
    /**
     * Instantiate to perform any setup of the ledger that might be required.
     * @param {Context} ctx the transaction context
     */
    async instantiate(ctx) {
        console.log('Instantiate the contract');
        const mgt = new commoditymgt_1.CommodityManagementContract();
        await mgt.setCommodityDescription(ctx, 'au', 'GOLD');
        await mgt.setCommodityDescription(ctx, 'ag', 'SILVER');
        await mgt.setCommodityDescription(ctx, 'fe', 'IRON');
        await mgt.setCommodityDescription(ctx, 'al', 'ALUMINIUM');
        // need to call the commodity management to establish the trading symbol description mapping
    }
}
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], LifecycleContract.prototype, "instantiate", null);
exports.LifecycleContract = LifecycleContract;
