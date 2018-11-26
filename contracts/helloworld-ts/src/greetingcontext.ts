import { Context } from 'fabric-contract-api';
import Greeting from './greeting';

/**
 * Define custom context for commercial paper by extending Fabric ContractAPI's Context class
 */
export default class TradeContext extends Context {

    constructor() {
        super();
    }

    public toLedgerBuffer(greeting: Greeting): Buffer {
        const buffer = Buffer.from(JSON.stringify(greeting));
        return buffer;
    }

    public fromLedgerBuffer(buffer: Buffer): Greeting {
        const data = JSON.parse(buffer.toString());
        return new Greeting(data.text);
    }

}
