# Running the Commercial Paper Contract - PaperNet
> An opinionated tutorial showing a best practice approach, using Node.js chaincode

> Written for the 'unstable' branches of Fabric 


## Setup a dev environemnt.

This was written using Ubuntu exclusively but the sample approach is valid for other platforms. 

- Node chaincode needs node v8.9.x   (as this uses GRPC that has native modules you'll need python)
- Running fabric will need to have docker
- Development is best with vscode

It will be useful to have several command windows open, one for showing the logs streamed from the docker containers. One for the chaincde (when run in dev mode) and a final one for issuing commands to execute the contract.

First step is to clone this repo to get both the scripts and code for application and contract

```
$ git clone https://github.com/ampretia/fabric-application-examples.git
```

### Getting a 'unstable' build

As 1.3 is yet to be a formal release, use the `getEdgeFabricDocker.sh` in the `infrastructure` directory to pull down the master branch docker containers.

```
$ .\fabric-application-examples\infrastructure\getEdgeFabricDocker.sh
```

## Contract Development Deployment

### Start fabric in development mode

We're going to use the basic network from the fabric-sample as the starting point for creating out PAPERNET.
Withing in the 'infrastructure' directory there is a 'basic-network' directory. This has a copy of the fabric-samples
basic netwok.  In that copied directory, there is a minor edit to the docker compose file, to enable the peer into debug mode. 
Using your editor of choice, find the following lines

```
    command: peer node start 
    # command: peer node start --peer-chaincodedev=true
```

For debug mode the line should be `command: peer node start --peer-chaincodedev=true`
For production mode it should be `command: peer node start`

The next step is start the fabric infrasturecture; as we are developing it is also very useful to be able to watch the output of all the docker containers. This can be done quite easily by using a tool called 'logspout' running in a separate window. From the `infrastructure\basic-network` directory run these commands

```
$ ./start.sh
$ ../monitor_docker.sh net_basic
```

This window will now show all the docker container output.

### Start the Chaincode
In another window you can know start the chaincode; this will run as a foreground process that lets you either output debug statements, or connect a debugger such as vscode should you wish.
Change to the `contracts\papernet-js` directory.

Run npm install to get all the dependencies ready

```
$ npm install
```

We can then start the chaincode in development mode

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
$ docker exec cli peer chaincode instantiate -n papernet -v 0 -l node -c '{"Args":["org.papernet.commercialpaper.instantiate"]}' -C mychannel
```

## Recap

To this point, we've cloned a sample repo, pulled down the latest code, started a Fabric infrastructure. A contract has been installed on the Fabric peer, and instantiated on the channel

## Application Start

Change to the `application/nodejs` directory. There are two steps to the application lifecycle.  Firstly a local 'idwallet' needs to be created that contains the credentials for a specific user know to the Fabric infrastructure. The application itself can then issue transactions.

Issue this command to run the app to setup a local folder with the credentials

```
$ node addToWallet.js
```

You can then run the application to issue the transactions

```
$ node application.js
```

