"use strict";
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
const fabric_contract_api_1 = require("fabric-contract-api");
let Commodity = class Commodity {
    constructor(obj) {
        Object.assign(this, obj);
    }
    static getType() {
        return 'Commodity';
    }
    getTradeId() {
        return this.tradeId;
    }
    getTradingSymbol() {
        return this.tradingSymbol;
    }
    getDescription() {
        return this.description;
    }
    getQuantity() {
        return this.quantity;
    }
    getOwner() {
        return this.owner;
    }
};
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], Commodity.prototype, "tradeId", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], Commodity.prototype, "tradingSymbol", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], Commodity.prototype, "description", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], Commodity.prototype, "quantity", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], Commodity.prototype, "owner", void 0);
Commodity = __decorate([
    fabric_contract_api_1.Asset(),
    __metadata("design:paramtypes", [Object])
], Commodity);
exports.default = Commodity;
