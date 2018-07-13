# Running the Commercial Paper Contract - PaperNet
> An opinionated tutorial showing a best practice approach
> Written including sections on how to run with the 'master' copies of Fabric

## Setup a dev environemnt.

For node.js development; this was written using Ubuntu exclusively for development, the following tools are available on all Fabric supported platforms

- Node chaincode needs node v8.9.x   (as this uses GRPC that has native modules you'll need python)
- Java chaincode needs java 8 & gradle
- Running fabric will need to have docker
- Development is best with vscode

It will be useful to have several command windows open, one for showing the logs streamed from the docker containers. One for the chaincde (when run in dev mode) and a final one for issuing commands to execute the contract.

You will also need to get the fabric samples, docker images, and binaries. 

>  instructions here for that

## Create a project

To include other examples and useful tools, we'll create a specific directory for this and subsequently tutorials. 

```
$ mkdir fabric-application-examples
$ mkdir fabric-application-examples/contracts
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

```
$ touch lib\cpcontract.js lib\cpstate.js lib\utils.js 
```

Copy in the contents of the files from the samples repository

## Testing

At this point it is possible to unit test the contract without any other installation.

> more info needed here

## Development Deployment

### Start fabric in development mode

We're going to use the basic network from the fabric-sample as the starting point for creating out PAPERNET.
Make a directory 'infrastructure' and copy the 'basic-network' directory from the fabirc-samples repo.

```
$ cp -r ~/go/src/github.com/hyperledger/fabric-samples/basic-network .   
```

In that copied directory, we need to make a minor edit to the docker compose file, to enable the peer into debug mode. 
Using your editor of choice, find the following lines

```
    command: peer node start 
    # command: peer node start --peer-chaincodedev=true
```

Swap the comment on these lines, so the command is `peer node start --peer-chaincodedev=true`

Then we can start fabric; as we are developing it is also very useful to be able to watch the docker output. This can be done quite easily by using a tool called 'logspout' and run this in a separate window. This script is available in this repo. 

```
$ ./start.sh
$ ../monitor_docker.sh net_basic
```

### Start the Chaincode
In another window you can know start the chaincode; this will run as a foreground process that lets you either output debug statements, or connect a debugger such as vscode.

```
$ CORE_CHAINCODE_ID_NAME=papernet:0 $(npm bin)/fabric-chaincode-node start --peer.address=localhost:7052
```

The `CORE_CHAINCODE_ID_NAME` is needed to identify this running chaincode, and the address of the peer is needed. When the Peer is not in development mode, this is essentially the same code that is used to start contract within the chaincode container. Therefore there is strong fidelity of functionality between dev mode and production. 

### Install and Instantiate the Chaincode

In another window (the third and final one), you can issue the commands to interact with the contract. 
Firstly within the same `basic-network` directory start the docker container that will handle cli commands

```
$ docker-compose -f ./docker-compose.yml up -d cli 
```

The commands needed to install and instatiate the chaincode in dev mode are the same as production. Though the install command isn't really functionally needed - it is best to keep it. 

```
$ docker exec cli peer chaincode install -n papernet -v 0 -p /opt/gopath/src/github.com/papernet-js -l node
$ docker exec cli peer chaincode instantiate -n papernet -v 0 -l node -c '{"Args":["org.papernet.commercialpaper.initalize"]}' -C mychannel
```



