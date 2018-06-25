'use strict';

const UpdateValues = require('./updatevalues')
const RemoveValues = require('./removevalues')

require('fabric-shim').SmartContract.register([UpdateValues,RemoveValues]);

