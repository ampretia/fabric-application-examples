'use strict';

// SDK Library to asset with writing the logic
const SmartContract = require('fabric-shim').SmartContract;

// Business logic (well just util but still it's general purpose logic)
const util = require('util');

/**
 * Support the Updating of values within the SmartContract
 */
class RemoveValues extends SmartContract {

	constructor() {
		super('org.mynamespace.removes');
	}

	async halveAssetValue(api, args) {
		console.info('Transaction ID: ' + api.getTxID());
		console.info(util.format('Args: %j', args));

		let value = await api.getState('dummyKey')
		if (value.toString() === 'dummyValue') {
			console.error(util.format('Need to have numerc value set to double it', value));
			throw new Error(util.format('Need to have numerc value set to double it', value));
		} else {
			let v = value/2;
			await api.putState('dummyKey', v)
			return v;						
		}
	}

};

module.exports = RemoveValues;