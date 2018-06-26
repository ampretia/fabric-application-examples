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

Chaincode is deployed by the peer in response to issuing a number of (usually CLI) commands. For node.js chaincode the location of the chaincode npm project is required (the directory that the package.json is in). This does not need to be an installed project, but has to have all the code, and the package.json.

A docker image is built for this chaincode, the package.json and code copied in. and `npm install` run.
> It is important to make sure that you have a `package-lock.json` to make the correct packages are imported.

> TODO: What does this take in terms of the .gitignore etc?

After the install there is a 'bootstrap' process that starts the chaincode up. 

The constructors of the exported SmartContracts will be run at this point; functional logic must be put into the an exported function on the smart contract - so if there is some initial state to check or set for example this should be in a dedicated function that is invoked when the chaincode is instantiated.

**Point 3:** What needs to be exported?

Convention is that this is in `index.js` - but the actual value is taken from the 'main' field of the `package.json`

For example:

```
// index.js
'use strict';

const UpdateValues = require('./updatevalues')
const RemoveValues = require('./removevalues')

module.exports.contracts = ['UpdateValues','RemoveValues'];
```

This exports two classes that together form the SmartContract. There can be other code that within the model that is used in a support role. 


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

Note that ALL the functions defined in these modules will be called by the client SDK. 

- There are 3 functions `setup` `setNewAssetValue` and `doubleAssetValue` that can be called by issuing the appropriate invoke client side
- `setup` nor the `constructor` replaces the `chaincode.init` method
- The `api` in the function is the Fabric stub class that can be used for 'things'
- `args` is the arguments passed on the invoke. 
- The constructor contains a 'namespace' to help indentifiy the sets of functions

> TODO: add in some help methods in the super class... eg. custom 404 error message if fn doesn't exist when called. Get all the functions, get meta data of the chaincode. 

## Using this chaincode

Each of the functions can be invoked with arbitary arguements. The name of the function is of the format

```
[namespace_]functionname
```

If a namespace is given in the constructor then it will be prefixed separated by a _ (underscore)

> ??should this be a .??

> _assuming that you have a fabric up and running with the approriate environment variables set_
> _which is a not-trivial amount of work_

```
$ peer chaincode install -l node -n myfourthcc -v v0 -p .
$ peer chaincode instantiate -o localhost:7050 -C mychannel -l node -n myfourthcc -v v0 -c '{"Args":["init"]}' -P 'OR ("Org1MSP.member")'
```

Will get things working...
Then you can invoke the chaincode via this command.

```
$ peer chaincode invoke -o localhost:7050 -C mychannel -c '{"Args":["org.mynamespace.updates_setNewAssetValue","42"]}' -n myfourthcc
```


## Functions provided by the SmartContract class

These are functions provided by the super class

- `getNamespace()`

## Default SmartContract Functions invokable 

These are functions that can be invoked for all smart contracts

- `$getFunctions` gets a JSON structure for all the functions.