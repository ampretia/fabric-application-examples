/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Context, Contract, Returns, Transaction } from 'fabric-contract-api';
import Greeting from './greeting';
import GreetingContext from './greetingcontext';

export class GreetingContract extends Contract {

    public constructor() {
        super('Greeting');
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

    @Transaction()
    public async setGreetingText(ctx: GreetingContext, text: string): Promise<Greeting> {
        console.info('setGreetingText');
        const greeting: Greeting = new Greeting(text);

        console.info('Created greeting');

        await ctx.stub.putState('GREETING', ctx.toLedgerBuffer(greeting));
        console.log('put the greeting to the ledger');
        console.info(`setGreeting to ${greeting.getText()}`);

        return greeting;
    }

    @Transaction()
    public async setGreeting(ctx: GreetingContext, greeting: Greeting): Promise<void> {
        console.info('setGreeting');

        await ctx.stub.putState('GREETING', ctx.toLedgerBuffer(greeting));
        console.info(`setGreeting to ${greeting}`);
    }

    @Transaction()
    @Returns('Greeting')
    public async getGreeting(ctx: GreetingContext): Promise<Greeting> {
        console.info('getGreeting');

        const buffer = await ctx.stub.getState('GREETING');
        const greeting: Greeting = ctx.fromLedgerBuffer(buffer);
        console.info(`getGreeting of ${greeting.getText()}`);
        return greeting;
    }

}
