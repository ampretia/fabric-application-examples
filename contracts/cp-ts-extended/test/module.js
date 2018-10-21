/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const expect = chai.expect;
chai.use(sinonChai);

const Module = require('../index.js');


describe('CommercialPaper', () => {

    let sandbox = sinon.createSandbox();

    beforeEach(()=>{

    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should correctly create',()=>{
        expect(Module.contracts).to.be.an('array');
        console.log(Module.CommercialPaper.getType());
        expect(Module.CommercialPaper.getType()).to.equal('org.papernet.commercialpaper');
    });



});
