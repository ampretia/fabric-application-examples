/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const should = chai.should();
chai.use(sinonChai);

const CommercialPaper = require('../lib/papernet/paper');


describe('CommercialPaper', () => {

    let sandbox = sinon.createSandbox();

    beforeEach(()=>{

    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should correctly create',()=>{
        let cp = CommercialPaper.createInstance('issuer',42,'issueDateTime','maturityDate');
        cp.getIssuer().should.equal('issuer');
        should.not.exist(cp.getOwner());
    });

    it('should set the state correctly',()=>{
        let cp = CommercialPaper.createInstance('issuer',42,'issueDateTime','maturityDate');
        cp.setIssued();
        cp.isIssued().should.be.true;
        cp.isTrading().should.be.false;
        cp.isRedeemed().should.be.false;

        cp.setTrading();
        cp.isIssued().should.be.false;
        cp.isTrading().should.be.true;
        cp.isRedeemed().should.be.false;

        cp.setRedeemed();
        cp.isIssued().should.be.false;
        cp.isTrading().should.be.false;
        cp.isRedeemed().should.be.true;
    });

    it('should set the datae correctly',()=>{
        let cp = CommercialPaper.createInstance('issuer',42,'issueDateTime','maturityDate');
        cp.setIssuer('newissuer');
        cp.getIssuer().should.equal('newissuer');

        cp.setOwner('newOwner');
        cp.getOwner().should.equal('newOwner');
    });

    it('should deserialize correctly',()=>{
        let cp = CommercialPaper.createInstance('issuer',42,'issueDateTime','maturityDate');
        let data = Buffer.from(JSON.stringify(cp));

        let o = CommercialPaper.deserialize(data);
        o.should.be.an.instanceof(CommercialPaper);
    });

    it('should have the correct type',()=>{
        CommercialPaper.getType().should.equal('org.papernet.commercialpaper');
    });

});
