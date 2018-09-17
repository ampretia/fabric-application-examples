# Running the Commercial Paper Contract - PaperNet
> An opinionated tutorial showing a best practice approach, using Node.js chaincode

> Written for the 'unstable' branches of Fabric 


## Setup a dev environemnt.

This was written using Ubuntu exclusively but the sample approach is valid for other platforms. 

- Node chaincode needs node v8.9.x   (as this uses GRPC that has native modules you'll need python)
- Running fabric will need to have docker
- Development is best with vscode

It will be useful to have several command windows open, one for showing the logs streamed from the docker containers. One for the chaincde (when run in dev mode) and a final one for issuing commands to execute the contract.

It is worth clone this repo to get the helper scripts; it also has all the completed code. You may wish to create a new directory to write your own code.

```
$ git clone https://github.com/ampretia/fabric-application-examples.git
```

### Getting a 'unstable' build

As 1.3 is yet to be a formal release, use the `getEdgeFabricDocker.sh` in the `infrastructure` directory to pull down the master branch docker containers.

```
$ .\fabric-application-examples\infrastructure\getEdgeFabricDocker.sh
```

## Create a project

To include other examples and useful tools, we'll create a specific directory for this and subsequently tutorials. 

```
$ mkdir my-fabric-examples
$ mkdir my-fabric-examples/contracts
```

Install the Yeoman tool, and the generator for fabric.

```
$ npm install -g yo generator-fabric
```

.. and then create a directory to scaffold the contract into. 

```
$ mkdir fabric-contract-examples/contracts/papernet-js
$ cd fabric-contract-examples/contracts/papernet-js
```

.. and then run the Fabric Contract generator.  This will ask a number of questions.

```
$ yo fabric:contract   

? Please specify the contract language: JavaScript
? Please specify the contract name: papernet-js
? Please specify the contract version: 0.0.1
? Please specify the contract description: Papernet Contract
? Please specify the contract author: hyperledger
? Please specify the contract license: Apache-2.0

$ tree

.
├── index.js
├── lib
│   └── my-contract.js
├── package.json
└── test
    └── my-contract.js

```

At this point either edit the lib/contract.js class and set this up for your own use, or follow the Papernet example in the docs.
So lets follow the Papernet example. Remove the my-contract.js file and replace it with three new files

The three files are in the `fabric-application-examples\contracts\papernet-js\lib` directory.

Copy in the contents of the files from the samples repository

## Testing

At this point it is possible to unit test the contract without any other installation.

> more info needed here

