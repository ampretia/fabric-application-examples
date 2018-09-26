/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const should = chai.should();
chai.use(sinonChai);
const expect  = chai.expect;

const {DataUtils,StateList} = require('../lib/ledger/ledgerutils');
const {Context} = require('fabric-contract-api');

describe('MyContract', () => {

    let sandbox = sinon.createSandbox();

    beforeEach(()=>{

    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('DataUtils',()=>{
        it('should take an object and correct give back a buffer with the JSON format',()=>{
            // it is true that the this is duplicating code, but the lines does need executing
            // to confirm correctness, and create a place for more tests should this become
            // more sophisticated later
            let testObject = function fred() {
                this.a=1;
                this.b='hello',
                this.c = {another:'object'};
                this.type= 'myobject';};

            let o1 = new testObject();

            let result = DataUtils.serialize(o1);
            result.should.deep.equal(Buffer.from(JSON.stringify(o1)));
        });

        it('should use the deserialize class fn',()=>{
            let testObject = function fred() {
                this.a=1;
                this.b='hello',
                this.c = {another:'object'};
                this.type= 'myobject';};

            let o1 = new testObject();
            let data = Buffer.from(JSON.stringify(o1));
            let object = DataUtils.deserializeClass(data,testObject);
            expect(object.a).to.equal(1);
        });

        it('should use the deserialize supporttypes',()=>{
            let testObject = function fred() {
                this.a=1;
                this.b='hello',
                this.c = {another:'object'};
                this.type= 'myobject';};

            let o1 = new testObject();
            let data = Buffer.from(JSON.stringify(o1));
            let object = DataUtils.deserialize(data,{myobject:testObject});
            expect(object.a).to.equal(1);
        });

        it('should use the deserialize supporttypes',()=>{
            let testObject = function fred() {
                this.a=1;
                this.b='hello',
                this.c = {another:'object'};
                this.type= 'wibble';};

            let o1 = new testObject();
            let data = Buffer.from(JSON.stringify(o1));
            (()=>{
                DataUtils.deserialize(data,{myobject:testObject});
            }).should.throw(/Unknown type/);

        });
    });

    describe('StateList',()=>{
        let stubContext;
        beforeEach(()=>{
            stubContext = sandbox.createStubInstance(Context);
        });

        it('should run constructor',()=>{
            let stateList = new StateList(stubContext,'listname');
            should.exist(stateList);
        });
    });

});
