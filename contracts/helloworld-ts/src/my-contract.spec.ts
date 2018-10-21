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

import { Context } from 'fabric-contract-api';
import { ChaincodeStub, ClientIdentity } from 'fabric-shim';
import 'mocha';
import { MyContract } from '.';

import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

chai.should();
chai.use(sinonChai);

class TestContext implements Context {
    public stub: ChaincodeStub = sinon.createStubInstance(ChaincodeStub);
    public clientIdentity: ClientIdentity = sinon.createStubInstance(ClientIdentity);
}

describe('MyContract', () => {

    describe('#instantiate', () => {

        it('should work', async () => {
            const contract = new MyContract();
            const ctx = new TestContext();
            await contract.instantiate(ctx);
            sinon.assert.calledOnce(ctx.stub.putState as sinon.SinonStub);
            sinon.assert.calledWith(ctx.stub.putState as sinon.SinonStub,
                'GREETING', Buffer.from(JSON.stringify({ text: 'Hi' })));
        });

    });

    describe('#setGreeting', () => {

        it('should work', async () => {
            const contract = new MyContract();
            const ctx = new TestContext();
            await contract.setGreeting(ctx, 'hello');
            sinon.assert.calledOnce(ctx.stub.putState as sinon.SinonStub);
            sinon.assert.calledWith(ctx.stub.putState as sinon.SinonStub,
                'GREETING', Buffer.from(JSON.stringify({ text: 'hello' })));
        });

    });

    describe('#getGreeting', () => {

        it('should work', async () => {
            const contract = new MyContract();
            const ctx = new TestContext();
            (ctx.stub.getState as sinon.SinonStub).resolves(Buffer.from(JSON.stringify({text: 'a returned string'})));
            const value = await contract.getGreeting(ctx);
            value.should.deep.equal(Buffer.from(JSON.stringify({text: 'a returned string'})));
        });

    });

});
