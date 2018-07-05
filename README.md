# How to write a smart contract

> This is based of the version 1.2 of Fabric, with a modified `fabric-chaincode-node` implementation.
> (This is in the 'europa' branch of https://github.com/mbwhite/fabric-chaincode-node/ with the example at 
> https://github.com/mbwhite/chaincode-examples/tree/europa .  Eurpoa is just a name to identify this approach)
>
> This is a point in time document; changes specifically to the separation of implementation from API are planned


## Writing the chaincode

### 1: Chaincode is created as an npm module.

An initial `package.json` is as follows - the only runtime dependencay as far as anything blockchain is concerned is the `fabric-shim`.  Please add additinal business logic and testing libraries! This `fabric-shim` is requried for the `SmartContract` class that should be extended by all contracts, and the code to 'bootstrap' the chaincode into life.


```
{
  "name": "chaincode",
  "description": "My first exciting chaincode implemented in node.js",
  "engines": {
    "node": ">=8.4.0",
    "npm": ">=5.3.0"
  },
  "scripts": {
    "start": "startChaincode"
  },
  "engine-strict": true,
  "engineStrict": true,
  "version": "1.0.0",
  "main": "index.js",
  "author": "",
  "license": "ISC",
  "dependencies": {
    "fabric-shim": "^1.2.0-mbw-europa"
  }
}

```

### 2: How is chaincode deployed?

Chaincode is deployed by the peer in response to issuing a number of (usually CLI) commands. For node.js chaincode the location of the chaincode npm project is required (the directory that the package.json is in). This does not need to be an installed project, but has to have all the code, and the package.json.

A docker image is built for this chaincode, the package.json and code copied in. and `npm install` run.
> It is important to make sure that you have a `package-lock.json` to ensure the correct packages are imported.

After the install there is a 'bootstrap' process that starts the chaincode up (more details later). The constructors of the exported SmartContracts will be run at this point; these constructors are for setting the namespace and optionally  setup of the 'error/monitoring functions', (again more later).

When chaincode is instantiated or updated, the `init()` function is the chaincode is called. As with the `invoke()` call from the client, a fn name and parameters can be passed. Remember therefore to have specific functions to call on `init()` and `update()` in order to do any data initialization or migration that might be needed

### 3: What needs to be exported?

Node states that modeul exports are defined in `index.js`

In this example we have a single value that can be queried and updated. This has been split into to parts for demonstration purposes. 

```
// index.js
'use strict';

const UpdateValues = require('./updatevalues')
const RemoveValues = require('./removevalues')

module.exports.contracts = ['UpdateValues','RemoveValues'];
```

This exports two classes that together form the SmartContract. There can be other code that within the model that is used in a support role. 
*Note that the 'contracts' word is mandatory.*

### 4: What do these classes need to contain?

As an example the `updatevalues` will look like this (with the function bodies remove for clarity)

```
// updatevalues.js
'use strict';

// SDK Library to asset with writing the logic
const SmartContract = require('fabric-shim').contractapi.SmartContract;

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

	async setNewAssetValue(api, newValue) {
	  //  .....
	}

	async doubleAssetValue(api) {
	  //  .....
	}

};

module.exports = UpdateValues;
```

Note that ALL the functions defined in these modules will be called by the client SDK. 

- There are 3 functions `setup` `setNewAssetValue` and `doubleAssetValue` that can be called by issuing the appropriate invoke client side
- The `api` in the function is the Fabric stub class that can be used for 'things'
- `args` is the arguments passed on the invoke. 
- The constructor contains a 'namespace' to help indentifiy the sets of functions
- Note that the arguements are split out.

### 5: Alteratnive ways of specifing the contracts

*package.json*

Insted of providing the Smart Contracts as exports, you can add details to the package.json. Using the above functions add this to the package.json

```
  "contracts":{
    "classes": ["removevalues.js","updatevalues.js"]
  }
```

If present this takes precedence over the exports.

*Programatically*

At some point, the smart contracts that need to be invoked need to be registered with the peer. So far this has been done for you, by either specifing them in the package.json or using the `npm start` to call the boot strap code. 

If you want to provide a different `npm start` entry point, that is fine. So long as the smart contracts are registered. There are 2 ways to do this

First you could call the same code that the bootstrap command does

```
require('fabric-shim').spi.startChaincode();
```

Or specifically give the classes

```
const UpdateValues = require('./updatevalues')
const RemoveValues = require('./removevalues')
require('fabric-shim').spi.register( [UpdateValues,RemoveValues] );
```




## Running chaincode in dev mode

This is quite easy - as you need to run the startChaincode command.

```
$ npx startChaincode --peer.address localhost:7052
```

In the example above this has been setup in the npm start scripts. So for example

```
$ npm start -- --peer.address localhost:7052
```

(this is actually what the peer does; this does mean that any chaincode that is written using the existing chaincode interface will continue to work as is.)

## Using this chaincode

Each of the functions can be invoked with arbitary arguements. The name of the function is of the format

```
[namespace_]functionname
```

If a namespace is given in the constructor then it will be prefixed separated by a _ (underscore)

> _assuming that you have a fabric up and running with the approriate environment variables set_

```
$ peer chaincode install --lang node --name mycontract --version v0 --path ~/chaincode-examples
$ peer chaincode instantiate --orderer localhost:7050 --channelID mychannel --lang node --name mycontract --version v0 -c '{"Args":["org.mynamespace.updates_setup"]}'
```

Will get things working...
Then you can invoke the chaincode via this command.

```
$ peer chaincode invoke --orderer localhost:7050 --channelID mychannel -c '{"Args":["org.mynamespace.removes_getAssetValue"]}' -n mycontract4  
```


## Additional support provided by the SmartContract class

In the case where you ask for a function to be executed, it could be the case that this doesn't exist. 
You can provide you own function to be executed in this case, the default is to throw and error but you're able to customise this if you wish. 

For example


```
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
    throw new Error('Big Friendly letters ->>> DON\'T PANIC')
	}

```

