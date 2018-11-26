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

export class MyContract extends Contract {

    @Transaction()
    public async instantiate(ctx: Context): Promise<any> {
        const greeting = { text: 'Hi' };
        await ctx.stub.putState('GREETING', Buffer.from(JSON.stringify(greeting)));
        console.info('Set the default greeting');
    }

    @Transaction()
    public async setGreetingText(ctx: Context, text: string): Promise<any> {
        const greeting = { text };
        await ctx.stub.putState('GREETING', Buffer.from(JSON.stringify(greeting)));
        console.info(`setGreeting to ${greeting.text}`);
    }

    @Transaction()
    @Returns('object')
    public async getGreeting(ctx: Context): Promise<object> {
        const buffer = await ctx.stub.getState('GREETING');
        const greeting = JSON.parse(buffer.toString());
        console.info(`getGreeting of ${greeting.text}`);
        return greeting;
    }

}
