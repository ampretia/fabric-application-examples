import { Contract } from 'fabric-contract-api';
import Commodity from './commodity';
import TradeContext from './tradeContext';
/**
 * Define commercial paper smart contract by extending Fabric Contract class
 *
 */
export declare class TradeContract extends Contract {
    constructor();
    /**
     * A custom context provides easy access to list of all trades
     */
    createContext(): TradeContext;
    /**
     * Instantiate to perform any setup of the ledger that might be required.
     * @param {Context} ctx the transaction context
     */
    instantiate(ctx: any): Promise<void>;
    addCommodity(ctx: any, commodity: Commodity): Promise<void>;
    /**
     * Track the trade of a commodity from one trader to another
     * @param {Context} ctx the transaction context
     * @param {Trade} trade - Object representing the trade (from JSON)
     * @transaction
     */
    tradeCommodity(ctx: any, tradingSymbol: string, tradeId: string, newOwner: string): Promise<Commodity>;
}
