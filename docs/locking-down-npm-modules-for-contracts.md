# The concern

When the `npm install` happens for node.js contracts, it does standard npm installation of the modules mentioned. It actually, correctly does 
`npm install --production`.  Within a secured production environment even this has issues.

- What if the dependencies change?  What about the dependencies of dependencies?
- What if some datacentres have enterprise npm repositories?

The issues here are acknowledged within the Fabric community and there are JIRAs that have been raised for this. Would encourage anybody 
affected to take a look and vote on them/add your voice. 

Using the contract-api approach to writing Smart Contracts for Fabric makes a local solution to the problems more feasible ahead of formal support.

# Solution

## Write and test your contract

When writing your contract make sure that pay close attention to what is a dependency, and a devDependency. 
Install the `fabric-shim` as a dev dependency.

## Product a distributable version

For example, lets assume that your final code is in the `dist` directory as it has been compiled from Typescript
Let's also assume that you have have set as per standard the main entry in the package.json is set to 
`dist/index.js`

i.e. the contract is a npm module that is exporting the standard `contracts` property

1 - create a temporary directory - there is a structure that we need so use this command
```
mkdir -p contractDist/contract/node_modules
```

2 - copy the package.json
```
cp ./package*.json ./contractDist/contract
```

3 - copy the dist directory
```
cp -r ./dist ./contractDist/contract/
```

4 - run the `npm install` command to setup just the runtime dependencies
```
npm install --prefix ./contractDist/contract --production
```

5 - There are two files that are now needed to be created
```
touch ./contractDist/package.json
touch ./contractDist/index.js
```

6 - Edit the package.json just created and use this set of contents (I've left out author, description etc for clarity)

```
{
  "name": "dist",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "npm rebuild --prefix ./contract && NODE_PATH=./contract/node_modules node index.js"
  },
  "dependencies": {
    "fabric-shim": "fabric-shim-snapshot.1.3.0"
  }
}
```

7 - edit the `index.js` with this set of contents

```
'use strict';

const path = require('path');
const spi = require('fabric-shim').spi;

let folder = path.join(__dirname,'contract');
let { contracts } = require(folder);

spi.register(contracts);
```

When you issue the `peer install` command point to the `contractDist` directory.

## What has this created?

This is wrapping up your contract within another 'shell-contract'.  
This shell contract's job is just dependent on the `fabric-shim` code, and uses the `fabric-contract-api` to register your contract when it is started.

You contract needs it's dependancies setup, but we've done this upfront with the `npm install --prefix <> --production` command.
But what we need to do is the `npm rebuild` to ensure that the native code has been correctly put in place.

This is done when the contract is started. 


