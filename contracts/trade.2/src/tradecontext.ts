import { Context } from 'fabric-contract-api';
import CommodityList from './commodityList';
/**
 * Define custom context for commercial paper by extending Fabric ContractAPI's Context class
 */
export default class TradeContext extends Context {

    public commodityList: CommodityList;

    constructor() {
        super();
        this.commodityList = new CommodityList(this);
    }

}
