'use strict';

// SDK Library to asset with writing the logic

// imaginee the next line to be
// const SmartContract = require('fabric-contract-api').SmartContract;
const SmartContract = require('fabric-shim').contractapi.SmartContract;

// Business logic (well just util but still it's general purpose logic)
// const util = require('util');

/**
 * Support the Updating of values within the SmartContract
 */
class RemoveValues extends SmartContract {

	constructor() {
		super('org.mynamespace.removes');

		// going to leave the default 'not known function' handling alone
	}

	async quarterAssetValue(api) {
		console.info('Transaction ID: ' + api.getTxID());
		
		let value = await api.getState('dummyKey')
		if (isNan(value)) {
			let str = `'Need to have numerc value set to quarter it, ${value}`;
			console.error(str);
			throw new Error(str);
		} else {
			let v = value/4;
			await api.putState('dummyKey', v)
			return v;						
		}
	}


	async getAssetValue(api){
		console.info('Transaction ID: ' + api.getTxID());
		
		let value = await api.getState('dummyKey')

		return value;
	}

};

module.exports = RemoveValues;