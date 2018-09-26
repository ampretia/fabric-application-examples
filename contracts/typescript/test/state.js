/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const should = chai.should();
chai.use(sinonChai);

const State = require('../lib/ledger/state');


describe('State', () => {

    let sandbox = sinon.createSandbox();

    beforeEach(()=>{

    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should correctly create',()=>{
        let s = new State('atype',['akey','of','multiple']);
        s.getType().should.equal('atype');
        s.getKey().should.equal('\"akey\":\"of\":\"multiple\"');  //eslint-disable-line
        should.not.exist(s.getCurrentState());
    });

    it('should permit updates to the state',()=>{
        let s = new State('atype',['akey','of','multiple']);
        should.not.exist(s.getCurrentState());
        s.currentState='firstbase';
        s.getCurrentState().should.equal('firstbase');

        s.currentState='secondbase';
        s.getCurrentState().should.equal('secondbase');
    });

    it('should create the key correctlt',()=>{
        State.makeKey(['akey','of','multiple']).should.equal('\"akey\":\"of\":\"multiple\"');  //eslint-disable-line
        State.makeKey(['akey']).should.equal('\"akey\"');  //eslint-disable-line
    });

});
