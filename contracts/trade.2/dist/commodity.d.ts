import { State } from 'fabric-contract-api';
import Owner from './owner';
export default class Commodity extends State {
    tradingSymbol: string;
    description: string;
    quantity: number;
    owner: Owner;
    /**
     * All objects to have single object constructor that takes an object whose propeties will become
     * this
     */
    constructor(obj: any);
    getTradingSymbol(): string;
    getDescription(): string;
    getQuantity(): number;
    getOwner(): Owner;
    setOwner(owner: Owner): void;
}
