/// <reference path="../node_modules/fabric-contract-api/types/index.d.ts" />
import { StateList } from 'fabric-contract-api';
import Commodity from './commodity';
/** Commodity list that puts commodities into the ledger via the statelist */
export default class CommodityList extends StateList {
    constructor(ctx: any);
    addCommodity(commodity: Commodity): Promise<void>;
    getCommodity(commodityKey: any): Promise<'fabric-contract-api'.State>;
    updateCommodity(commodity: Commodity): Promise<void>;
    getAllCommodities(): Promise<'fabric-contract-api'.State[]>;
}
