
import { Contract, Returns, Transaction } from 'fabric-contract-api';
import Greeting from './greeting';
import GreetingContext from './greetingcontext';

export class GreetingContract extends Contract {

    public constructor() {
        super('Setup');
    }

    /**
     * Define a custom context for commercial paper
     */
    public createContext() {
       return new GreetingContext();
    }

    @Transaction()
    public async instantiate(ctx: GreetingContext): Promise<any> {
        const greeting = { text: 'Hi' };
        await ctx.stub.putState('GREETING', Buffer.from(JSON.stringify(greeting)));
        console.info('Set the default greeting');
    }
}
