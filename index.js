/*
# Copyright IBM Corp. All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0
*/

module.exports = require('./lib/chaincode.js');

const { register } = require('./lib/contract-spi/bootstrap');
module.exports.spi = { register };
