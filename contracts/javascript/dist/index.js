'use strict';

const path = require('path');
const spi = require('fabric-shim').spi;

let folder = path.join(__dirname,'contract');
let { contracts } = require(folder);

spi.register(contracts);
