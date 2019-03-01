import { Context, Contract } from 'fabric-contract-api';
/**
 * Additional contract within the 'trade-ts' sample that shows a second use of the contract class
 */
export declare class CommodityManagementContract extends Contract {
    constructor();
    setCommodityDescription(ctx: Context, tradingSymbol: string, description: string): Promise<void>;
    /**
     * Gets the description
     */
    getCommodityDescription(ctx: Context, tradingSymbol: string): Promise<any>;
    getMessage(ctx: Context): Promise<string>;
}
