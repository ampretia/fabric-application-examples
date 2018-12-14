/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

import { CommodityManagementContract } from './commoditymgt';
export { CommodityManagementContract } from './commoditymgt';

import { TradeContract } from './trade';
export { TradeContract } from './trade';

import { LifecycleContract } from './lifecyclecontract';
export { LifecycleContract } from './lifecyclecontract';

export const contracts: any[] = [ TradeContract, CommodityManagementContract, LifecycleContract ];
