export default class Commodity {
    static getType(): string;
    tradeId: string;
    tradingSymbol: string;
    description: string;
    quantity: number;
    owner: string;
    constructor(obj: Commodity);
    getTradeId(): string;
    getTradingSymbol(): string;
    getDescription(): string;
    getQuantity(): number;
    getOwner(): string;
}
