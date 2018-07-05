'use strict';

// SDK Library to asset with writing the logic

// imaginee the next line to be
// const SmartContract = require('fabric-contract-api').SmartContract;
const SmartContract = require('fabric-shim').contractapi.SmartContract;

// Business logic (well just util but still it's general purpose logic)
const util = require('util');

/**
 * Support the Updating of values within the SmartContract
 */
class UpdateValues extends SmartContract {

	/** 
	 * Sets a namespace so that the functions in this particular class can 
	 * be separated from others.
	 */
	constructor() {
		super('org.mynamespace.updates');
		this.$setUnkownFn(this.unkownFn);
	}

	/** The function to invoke if something unkown comes in.
	 * 
	 */
	async uknownFn(api){
		console.log("Big Friendly letters ->>> DON\'T PANIC")
	}

	/**
	 * A function that will setup a starting value
	 * Note that this is not expliclity called from init.  IF you want it called from init, then
	 * specifiy it in the fn name when init is invoked.
	 * 
	 * @param {api} api 
	 */
	async setup(api){
		return api.putState('dummyKey', Buffer.from('Starting Value'));
	}

	/**
	 * 
	 * @param {api} api 
	 * @param {int|string} newAssetValue new asset value to set
	 */
	async setNewAssetValue(api, newAssetValue) {
		console.info(`Transaction ID: ${api.getTxID()}`);
		console.info(`New Asset value will be ${newAssetValue}`);

		return api.putState('dummyKey', Buffer.from(newAssetValue));
	}

	/**
	 * Doubles the api if it is a number fail otherwise
	 * @param {api} api 
	 */
	async doubleAssetValue(api) {
		console.info(`Transaction ID: ${api.getTxID()}`);

		let value = await api.getState('dummyKey')
		if (isNaN(value)) {
			let str = `'Need to have numerc value set to double it, ${value}`;
			console.error(str);
			throw new Error(str);
		} else {
			let v = value*2;
			await api.putState('dummyKey', v)
			return v;						
		}
	}

};

module.exports = UpdateValues;