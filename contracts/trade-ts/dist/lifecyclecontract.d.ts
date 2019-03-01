import { Context, Contract } from 'fabric-contract-api';
/**
 * Additional contract within the 'trade-ts' sample that shows a second use of the contract class
 */
export declare class LifecycleContract extends Contract {
    constructor();
    /**
     * Instantiate to perform any setup of the ledger that might be required.
     * @param {Context} ctx the transaction context
     */
    instantiate(ctx: Context): Promise<void>;
}
