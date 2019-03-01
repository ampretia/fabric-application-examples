/*
SPDX-License-Identifier: Apache-2.0
*/
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const commoditymgt_1 = require("./commoditymgt");
var commoditymgt_2 = require("./commoditymgt");
exports.CommodityManagementContract = commoditymgt_2.CommodityManagementContract;
const trade_1 = require("./trade");
var trade_2 = require("./trade");
exports.TradeContract = trade_2.TradeContract;
const lifecyclecontract_1 = require("./lifecyclecontract");
var lifecyclecontract_2 = require("./lifecyclecontract");
exports.LifecycleContract = lifecyclecontract_2.LifecycleContract;
exports.contracts = [trade_1.TradeContract, commoditymgt_1.CommodityManagementContract, lifecyclecontract_1.LifecycleContract];
