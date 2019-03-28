import { Contract, Network } from 'fabric-network';

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

export class GreetingAPI {
    public String;

    private contractName = 'Greeting';

    private network: Network;
    private contract: Contract;

    public constructor(network) {
        this.network = network;
    }

    public async init(chaincodeId: string) {
        this.contract = await this.network.getContract(chaincodeId, this.contractName);
    }
    public async setGreeting(greeting): Promise<string> {
        const setGreeting = await this.contract.createTransaction('setGreeting');
        const result = await setGreeting.submit(JSON.stringify(greeting));

        console.log(result.toString());
        return result.toString();
    }

    public async setGreetingText(greetingText): Promise<void>  {
        const setGreetingText = await this.contract.createTransaction('setGreetingText');
        await setGreetingText.submit(JSON.stringify(greetingText));
    }

    public async getGreeting(): Promise<object> {
        const tx = await this.contract.createTransaction('getGreeting');
        const receivedGreeting = await tx.evaluate();
        return JSON.parse(receivedGreeting.toString());
    }

    public async getGreetingText(): Promise<object> {
        const greeting: any = await this.getGreeting();
        return greeting.text;
    }

    public async paragraph(): Promise<object> {
        const tx = await this.contract.createTransaction('paragraph');
        const r = await tx.evaluate();
        return r;
    }

}
