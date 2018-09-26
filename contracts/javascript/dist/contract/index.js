/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

const cpcontract = require('./lib/papernet/papercontract.js');
module.exports.contracts = [cpcontract];

module.exports.CommercialPaper = require('./lib/papernet/paper.js');
