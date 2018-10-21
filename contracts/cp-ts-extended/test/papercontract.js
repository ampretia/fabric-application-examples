/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
const should = chai.should();
chai.use(sinonChai);
chai.use(require('chai-as-promised'));

// const {DataUtils,StateList} = require('../lib/ledgerutils');
// const {Context} = require('fabric-contract-api');
const {Stub} = require('fabric-shim');
const CommercialPaperContract = require('../lib/papernet/papercontract');
const Paper = require('../lib/papernet/paper');


/** These tests works by stubing out the context stub object to get a better end to end test */

describe('e2e PaperContract', () => {


    let sandbox = sinon.createSandbox();
    let mockStubAPI;

    beforeEach(()=>{
        mockStubAPI = sandbox.createStubInstance(Stub);
        mockStubAPI.createCompositeKey.returns('a-unique-key');
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('issue paper',()=>{

        it('should issue paper and set the correct state',async ()=>{
            let cp = new CommercialPaperContract();
            should.exist(cp);

            let ctx = cp.createContext();
            ctx.stub = mockStubAPI;

            let instanceCp = await cp.issue(ctx,'TheIssuer',34,'issuedate','maturitydate',300);

            let newPaper = Paper.deserialize(instanceCp);
            should.exist(newPaper);
            expect(newPaper.getIssuer(),'getIssuer').equal('TheIssuer');
            expect(newPaper.getOwner(),'getOwner').equal('TheIssuer');
            expect(newPaper.isIssued()).to.be.true;
            expect(newPaper.isTrading()).to.be.false;
            expect(newPaper.isRedeemed()).to.be.false;
        });

        it('call blank instantiate fn',()=>{
            let cp = new CommercialPaperContract();
            should.exist(cp);
            cp.instantiate();
        });

    });

    describe('buy paper',()=>{

        it('should buy the paper from issued',async ()=>{
            let buffer;
            let p = Paper.createInstance('TheIssuer',34,'issuedate','maturitydate',300);
            p.setOwner('TheIssuer');
            p.setIssued();
            buffer = Buffer.from(JSON.stringify(p));


            let cp = new CommercialPaperContract();
            should.exist(cp);

            let ctx = cp.createContext();
            ctx.stub = mockStubAPI;

            mockStubAPI.getState.resolves(buffer);


            let instanceCp =await cp.buy(ctx,'TheIssuer',34,'TheIssuer','NewOwner',500,'DateTime');
            let newPaper = Paper.deserialize(instanceCp);
            should.exist(newPaper);

            expect(newPaper.isIssued()).to.be.false;
            expect(newPaper.isTrading()).to.be.true;
            expect(newPaper.isRedeemed()).to.be.false;
            expect(newPaper.getOwner()).to.equal('NewOwner');
            expect(newPaper.getIssuer(),'getIssuer').to.equal('TheIssuer');
        });

        it('should buy the paper if already trading',async ()=>{
            let buffer;
            let p = Paper.createInstance('TheIssuer',34,'issuedate','maturitydate',300);
            p.setOwner('TheIssuer');
            p.setTrading();
            buffer = Buffer.from(JSON.stringify(p));


            let cp = new CommercialPaperContract();
            should.exist(cp);

            let ctx = cp.createContext();
            ctx.stub = mockStubAPI;

            mockStubAPI.getState.resolves(buffer);


            let instanceCp =await cp.buy(ctx,'TheIssuer',34,'TheIssuer','NewOwner',500,'DateTime');
            let newPaper = Paper.deserialize(instanceCp);
            should.exist(newPaper);

            expect(newPaper.isIssued()).to.be.false;
            expect(newPaper.isTrading()).to.be.true;
            expect(newPaper.isRedeemed()).to.be.false;
            expect(newPaper.getOwner()).to.equal('NewOwner');
            expect(newPaper.getIssuer(),'getIssuer').to.equal('TheIssuer');
        });

        it('should reject if paper is in the wrong state',()=>{
            let buffer;
            let p = Paper.createInstance('TheIssuer',34,'issuedate','maturitydate',300);
            p.setOwner('TheIssuer');
            p.setRedeemed();
            buffer = Buffer.from(JSON.stringify(p));

            let cp = new CommercialPaperContract();
            should.exist(cp);

            let ctx = cp.createContext();
            ctx.stub = mockStubAPI;

            mockStubAPI.getState.resolves(buffer);

            return cp.buy(ctx,'TheIssuer',34,'TheIssuer','NewOwner',500,'DateTime')
                .should.eventually.be.rejectedWith('Paper TheIssuer34 is not trading. Current state = 3');

        });

        it('should throw an error if the paper is not correctly ownerd',async ()=>{
            let buffer;
            let p = Paper.createInstance('TheIssuer',34,'issuedate','maturitydate',300);
            p.setOwner('SomeOtherPerson');
            p.setIssued();
            buffer = Buffer.from(JSON.stringify(p));


            let cp = new CommercialPaperContract();
            should.exist(cp);

            let ctx = cp.createContext();
            ctx.stub = mockStubAPI;

            mockStubAPI.getState.resolves(buffer);


            return cp.buy(ctx,'TheIssuer',34,'TheIssuer','NewOwner',500,'DateTime')
                .should.eventually.be.rejectedWith('Paper TheIssuer34 is not owned by TheIssuer');
        });


    });

    describe('redeem paper',()=>{

        it('should redeem the paper',async ()=>{

            let p = Paper.createInstance('TheIssuer',34,'issuedate','maturitydate',300);
            p.setOwner('NewOwner');
            p.setTrading();
            let buffer = Buffer.from(JSON.stringify(p));

            let cp = new CommercialPaperContract();
            should.exist(cp);

            let ctx = cp.createContext();
            ctx.stub = mockStubAPI;

            mockStubAPI.getState.resolves(buffer);

            let instanceCp = await cp.redeem(ctx,'TheIssuer','34','NewOwner','RedeemTime');
            let newPaper = Paper.deserialize(instanceCp);
            should.exist(newPaper);
            expect(newPaper.isRedeemed()).to.be.true;
            expect(newPaper.getOwner()).to.equal('TheIssuer');
        });

        it('should reject if paper already redeemed',async ()=>{

            let p = Paper.createInstance('TheIssuer',34,'issuedate','maturitydate',300);
            p.setOwner('NewOwner');
            p.setRedeemed();
            let buffer = Buffer.from(JSON.stringify(p));

            let cp = new CommercialPaperContract();
            should.exist(cp);

            let ctx = cp.createContext();
            ctx.stub = mockStubAPI;

            mockStubAPI.getState.resolves(buffer);

            return  cp.redeem(ctx,'TheIssuer','34','NewOwner','RedeemTime')
                .should.eventually.be.rejectedWith('Paper TheIssuer34 already redeemed');

        });

        it('should reject if paper owned by somebody different',async ()=>{

            let p = Paper.createInstance('TheIssuer',34,'issuedate','maturitydate',300);
            p.setOwner('SomeOtherOwner');
            p.setTrading();
            let buffer = Buffer.from(JSON.stringify(p));

            let cp = new CommercialPaperContract();
            should.exist(cp);

            let ctx = cp.createContext();
            ctx.stub = mockStubAPI;

            mockStubAPI.getState.resolves(buffer);

            return  cp.redeem(ctx,'TheIssuer','34','NewOwner','RedeemTime')
                .should.eventually.be.rejectedWith('Redeeming owner does not own paperTheIssuer34');

        });

    });

});
