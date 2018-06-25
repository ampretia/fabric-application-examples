# How to write a smart contract

This is based of the version 1.2 of Fabric, with a modified `fabric-chaincode-node` implementation.
(This is in the 'europa' branch of https://github.com/mbwhite/fabric-chaincode-node/ with the example at 
https://github.com/mbwhite/chaincode-examples/tree/europa .  Eurpoa is just a name to identify this approach)



## Writing the chaincode

**Point 1:** Chaincode is created as an npm module.

Minimal `package.json` is as follows - the only runtime dependencay as far as anything blockchain is concerned is the `fabric-shim`.  Please add additinal business logic and testing libraries! This `fabric-shim` is requried for the `SmartContract` class that should be extended by all contracts.

_Here the version is a locally published version of the repo above._ 

```
{
  "name": "chaincode",
  "description": "My first exciting chaincode implemented in node.js",
  "engines": {
    "node": ">=8.4.0",
    "npm": ">=5.3.0"
  },
  "engine-strict": true,
  "engineStrict": true,
  "version": "1.0.0",
  "main": "index.js",
  "author": "",
  "license": "ISC",
  "dependencies": {
    "fabric-shim": "^1.2.0-mbw-01"
  }
}
```

**Point 2:** How is chaincode deployed?

Chaincode is deployed by the peer in response to issuing a number of (usually CLI) commands - for node.js chaincode also take the location of the chaincode npm project . (Needs to be local at present, rather that pulling from npmjs or other repos. )  A docker image is built for this chaincode, the package.json and code copied in. and `npm install` run.

> It is important to make sure that you have a `package-lock.json` to make the correct packages are imported.

After this the chaincode is bootstrapped. The chaincode needs to export the smart contract classes - from which the set of the functions are taken. 

**Point 3:** What needs to be exported?

Typically this is in `index.js` - but it is what is exported in the main.

For example:

```
// index.js
'use strict';

const UpdateValues = require('./updatevalues')
const RemoveValues = require('./removevalues')

module.exports.contracts = ['UpdateValues','RemoveValues'];
```

This exports two classes that together form the SmartContract. 

**Point 4:** What do these classes need to contain?

As an example the `updatevalues` will look like this (with the function bodies remove for clarity)

```
// updatevalues.js
'use strict';

// SDK Library to asset with writing the logic
const SmartContract = require('fabric-shim').SmartContract;

// Business logic (well just util but still it's general purpose logic)
const util = require('util');

/**
 * Support the Updating of values within the SmartContract
 */
class UpdateValues extends SmartContract {

	constructor() {
		super('org.mynamespace.updates');
	}

	async setup(api){
	  //  .....
	}

	async setNewAssetValue(api, args) {
	  //  .....
	}

	async doubleAssetValue(api, args) {
	  //  .....
	}

};

module.exports = UpdateValues;
```

- There are 3 functions `setup` `setNewAssetValue` and `doubleAssetValue` that can be called by issuing the appropriate invoke client side
- `setup` does not relate the `chaincode.init` method
- The `api` in the function is the Fabric stub class that can be used for 'things'
- `args` is the arguments passed on the invoke. 
- The constructor contains a 'namespace' to help indentifiy the sets of functions

- TODO: add in some help methods in the super class... eg. custom 404 error message if fn doesn't exist when called. Get all the functions, get meta data of the chaincode. 

## Using this chaincode

_assuming that you have a fabric up and running with the approriate environment variables set_
TODO: fill out the steps that are requried before this. 
```
$ peer chaincode install -l node -n myfourthcc -v v0 -p .
$ peer chaincode instantiate -o localhost:7050 -C mychannel -l node -n myfourthcc -v v0 -c '{"Args":["init"]}' -P 'OR ("Org1MSP.member")'
```

Will get things working...
Then you can invoke the chaincode via this command.

```
$ peer chaincode invoke -o localhost:7050 -C mychannel -c '{"Args":["org.mynamespace.updates_setNewAssetValue","42"]}' -n myfourthcc
```