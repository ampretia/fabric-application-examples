# Fabric 1.4 - All new Programming Model 

## Introduction

Many years ago when I was learning the craft of programming the phrases 'High Level' and 'Low Level' programming languages were heard more frequently than today. There were times when your chosen programming approach couldn't provide the features you needed and you had to 'drop down' to a low level. Be this a direct call to an operating system function or in extreme cases I recall using assembly. Though I was to learn the formal definition of the word abstraction a later, the concept of different levels of abstraction was already well known to me. 

We might not hear the phrases high and low level as often, but the concepts are still very much present. For example in the web development world jQuery provides a high level of abstraction across different browsers, and let developers write more about the general concept of the DOM and lets browser specific differences be hidden

You may have heard of something called Blockchain and Smart Contracts; Hyperledger Fabric provides a permissioned ledger that supports Smart Contracts using general purposes languages and environments (NodeJS , Go, Java). 

### Terminology level set

The 'elevator pitch' on how chaincode or smart contracts works is as like this. 

Imagine starting with a set of key-value pairs. The value can be any data - and the key is a string; this is set is stored within a store - the "world state". A function can be run that reads this state and can propose changes to it. Create new key-value pairs, update values, or remove values. This proposal, together with details of the function, parameters, return values, and entity invoking it form up a transaction. This transaction, subject to the blockchain model of consensus and ordering can be persisted on the ledger. 

The way in which a developer will write code to create these functions, and invoke them is the 'Programming Model' as mentioned in the title.
*All new* programming model? Well not *all* new; we're building upon, not destroying the foundations laid by the existing concepts in Hyperledger Fabric.

## Quick recap on the foundations

Working with NodeJs,today a Hyperledger Fabric chaincode is written with a class implementing two methods `init` and `invoke`.  

The lifecycle of the chaincode container is that you 'install' the chaincode, you then 'instantiate' it at which point a docker image is created with your code inside, this is then started and within this container, the `init` function is called.

Applications can then call functions with data (called submitting a transaction) - the `invoke` function being called with the data. 
Chaincode can be updated with new code, at which point the process is similar. The code is installed, and `updgrade` command is issued, and the `init` function is again called should any data migration need to occur.  

Within your code, you have access to an API that permits you to manipulate 'world state', along with various other functions such as encrypting data, accessing who submitted the transaction. Data can be returned. 

The difference between the world state before and after the transaction forms a 'read write set' and it is this that is the basis of what is written to the ledger. 

## What is different now?

What we found was that people invariably had various named functions in the Smart Contracts; say 'issue' 'buy' 'redeem'. As all of these are routed via a single `invoke` function invariably some additional logic had to be written to separate out say the 'issue' from the 'buy'.

This is repeated over and over again, plus with a general array of arguments as strings, any concept of type safety is lost. A high-level abstraction is now available to make developing the code easier - more focusing on the logic and not the routing. This  abstraction has permitted a the definition of a 'meta-data' format that does for Chaincode what OpenApi/Swagger does for REST apis. 

## Smart Contract - 'hello world'

Let's consider the classic Hello World, but in a Smart Contract; not a great blockchain use-case but the point here is to showcase the API and structure you need. The steps below will create a working directory and scaffold into that a basic contract that we can build upon.

### Creating the code

- Again using the `~/dev-expr` as the root directory, create directory tree to hold the contract source code

```bash
mkdir -p ~/dev-expr/my-fabric-examples/contract
cd !$
```

- A prebuilt templated driven project is available. Install the Yeoman tool, and the generator for Fabric.

```bash
npm install -g yo generator-fabric
```

- By running the Yeoman generator, a basic project can be created. This is the transcript of questions and answers

```
$ yo                                                                                                        
? 'Allo matthew! What would you like to do? Fabric

Make sure you are in the directory you want to scaffold into.
This generator can also be run with: yo fabric

? Please specify the generator to run: Contract
This generator can also be run with: yo fabric:contract
? Please specify the contract language: TypeScript
? Please specify the contract name: greetingContract-ts
? Please specify the contract version: 0.0.1
? Please specify the contract description: Hello World
? Please specify the contract author: 
? Please specify the contract license: 
Generating files...
   create package.json
   create .editorconfig
   create src/index.ts
   create src/my-contract.spec.ts
   create src/my-contract.ts
   create tsconfig.json
   create tslint.json
   create .gitignore


I'm all done. Running npm install for you to install the required dependencies. If this fails, try running the command yourself.

```

- Once installed, using your favourite editor, look into the my-contract.ts file. 

```typescript
import { Context, Contract } from 'fabric-contract-api';

export class MyContract extends Contract {

    public async instantiate(ctx: Context): Promise<any> {
        console.info('instantiate');
    }

    public async transaction1(ctx: Context, arg1: string): Promise<any> {
        console.info('transaction1', arg1);
    }

    public async transaction2(ctx: Context, arg1: string, arg2: string): Promise<any> {
        console.info('transaction2', arg1, arg2);
    }

}
```

The class extends the my Contract class, and has three functions; the name of these is up to you.  Convention is there is a function called instantiate to call when the contract is instantiated.. but the function name is not important.

For this example, we'll do the following changes
- transaction1 will become a `setGreeting` function that takes a string argument
- transaction2 will become a `getGreeting` function to return the value previous stored on the ledger.
- instantiate will be modified to set a default greeting

```typescript

    public async instantiate(ctx: Context): Promise<void> {
        let greeting = { text: 'Hi' };
        await ctx.stub.putState('GREETING', Buffer.from(JSON.stringify(greeting)));
    }
```

We're using the `ctx.stub` to access the API, and `putState` updates the state keyed by 'GREETING', to a buffer of JSON data.

The `setGreeting` function is 
```typescript

    public async setGreeting(ctx: Context, greeting: string): Promise<any> {
        await ctx.stub.putState('GREETING', Buffer.from(JSON.stringify(greeting)));
        console.info(`setGreeting to ${greeting['text']}`);
    }
```

Very similar in structure to the instantiate but the data is coming from the arguments.

Finally `getGreeting` is probably not surprising; we're returning the buffer directory

```typescript

    public async getGreeting(ctx: Context): Promise<any> {
        let buffer = await ctx.stub.getState('GREETING');
        let greeting = JSON.parse(buffer.toString());       // the prasing of the buffer is to output only
        console.info(`getGreeting of ${greeting['text']}`);
        return buffer;
    }
```

We have all our business logic coded in the Smart Contract!

### Let's move on to testing

Before we move on to deploying this contract we need to check basic functionality using some unit tests. As part of the Yeoman generator
a test file and the infrastructure to run them has been created.

Look into the `my-contract.spec.ts` file, and you will see this is set up with the 3 tests already. This is using the mocha
framework with the *chai* and *sinon* assertion and stubbing libraries.

We can modify these tests to match our updated functions as follows. As theses are Typescript files, note there are a few differences to ensure type safety is maintained.

Instantiate function is tested as follows
```typescript
    describe('#instantiate', () => {

        it('should work', async () => {
            const contract = new MyContract();
            const ctx = new TestContext();
            await contract.instantiate(ctx);
            sinon.assert.calledOnce(ctx.stub.putState as sinon.SinonStub);
            sinon.assert.calledWith(ctx.stub.putState as sinon.SinonStub,
                'GREETING', Buffer.from(JSON.stringify({ text: 'Hi' })));
        });

    });
```

The set greeting function :

```typescript
    describe('#setGreeting', () => {

        it('should work', async () => {
            const contract = new MyContract();
            const ctx = new TestContext();
            await contract.setGreeting(ctx, 'hello');
            sinon.assert.calledOnce(ctx.stub.putState as sinon.SinonStub);
            sinon.assert.calledWith(ctx.stub.putState as sinon.SinonStub,
                'GREETING', Buffer.from(JSON.stringify({ text: 'hello' })));
        });

    });
```

# Using from the command line.

1. Start the Fabric infrastructure but in development mode. This will in a previous tutorial
2. Build the contract
```bash
npm run build
```

3. Now need to start the contract in dev mode, 
Add this line to the scripts section of the package.json
```json
        "start:dev": "CORE_CHAINCODE_LOGGING_SHIM=debug fabric-chaincode-node start --peer.address=localhost:7052 --chaincode-id-name hellonet:1",
```

4. When in dev mode, you are taking on the responsibility to start/stop the 'chaincode container' There isn't a container as such; rather a node.js application running from the command line.  This lets output come to the terminal directly and also makes the whole chaincode lifecycle a lot faster

5. You still need to issue the install and instantiate commands. Typically these can be done via a docker cli container (based on fabric-tools).

From the `~/dev-expr/my-fabric-examples` directory, create a new `docker-compose.yml` file with the following contents
```yaml
version: '2'

networks:
  basic:
    external:
      name: net_basic

services:
  fabriccli:
    container_name: cli
    image: hyperledger/fabric-tools
    tty: true
    environment:
      - GOPATH=/opt/gopath
      - CORE_VM_ENDPOINT=unix:///host/var/run/docker.sock
      - CORE_LOGGING_LEVEL=info
      - CORE_PEER_ID=cli
      - CORE_PEER_ADDRESS=peer0.org1.example.com:7051
      - CORE_PEER_LOCALMSPID=Org1MSP
      - CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
      - CORE_CHAINCODE_KEEPALIVE=10
    working_dir: /opt/gopath/src/github.com/hyperledger/fabric/peer
    command: /bin/bash
    volumes:
        - /var/run/:/host/var/run/
        - ./:/opt/gopath/src/github.com/
        - ./../fabric-samples/basic-network/crypto-config:/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/
    networks:
        - basic
```

Then start this up so that there is a connected CLI to the Fabric infrastructure that is running

```bash
cd ~/dev-expr/my-fabric-examples
docker-composer up -d
```

### Installing and Instantiating the contract

- First step is to install the contract - in dev mode this has little purpose, but is required so fabric has the correct internal state.
```bash
docker exec cli peer chaincode install -n hellonet -v 1 -p /opt/gopath/src/github.com/contract -l node 
```

- Instantiate is required - this would normally trigger the chaincode container to be created, and the instantiate transaction called. With dev mode, just the instantiate transaction is called. 

```bash
docker exec cli peer chaincode instantiate -n hellonet -v 1 -l node -c '{"Args":["instantiate"]}' -C mychannel
```

### Issuing transactions

To summarise what has been achieved so far, Fabric is installed and started. We've created a simple contract, and started that in dev mode. We've done the required administration to *install and instantiate* the contact. We can now invoke the transacitons.

- We'll call the `getGreeting` transaction first to get the default.
```bash
docker exec cli peer chaincode invoke --orderer orderer.example.com:7050 --channelID mychannel -c '{"Args":["getGreeting"]}' -n hellonet
2018-12-17 15:02:43.333 UTC [main] InitCmd -> WARN 001 CORE_LOGGING_LEVEL is no longer supported, please use the FABRIC_LOGGING_SPEC environment variable
2018-12-17 15:02:43.350 UTC [main] SetOrdererEnv -> WARN 002 CORE_LOGGING_LEVEL is no longer supported, please use the FABRIC_LOGGING_SPEC environment variable
2018-12-17 15:02:43.400 UTC [chaincodeCmd] chaincodeInvokeOrQuery -> INFO 003 Chaincode invoke successful. result: status:200 payload:"{\"text\":\"Hi\"}"
```
- Now we can update the arguments to change the text to 'Hello from Fabric'

```bash
docker exec cli peer chaincode invoke --orderer orderer.example.com:7050 --channelID mychannel -c '{"Args":["setGreeting","Hello from Fabric"]}' -n hellonet
2018-12-17 15:03:16.116 UTC [main] InitCmd -> WARN 001 CORE_LOGGING_LEVEL is no longer supported, please use the FABRIC_LOGGING_SPEC environment variable
2018-12-17 15:03:16.135 UTC [main] SetOrdererEnv -> WARN 002 CORE_LOGGING_LEVEL is no longer supported, please use the FABRIC_LOGGING_SPEC environment variable
2018-12-17 15:03:16.158 UTC [chaincodeCmd] chaincodeInvokeOrQuery -> INFO 003 Chaincode invoke successful. result: status:200
```

- Reissue the get to check the value has come back. 
```bash
docker exec cli peer chaincode invoke --orderer orderer.example.com:7050 --channelID mychannel -c '{"Args":["getGreeting"]}' -n hellonet
2018-12-17 15:03:20.921 UTC [main] InitCmd -> WARN 001 CORE_LOGGING_LEVEL is no longer supported, please use the FABRIC_LOGGING_SPEC environment variable
2018-12-17 15:03:20.937 UTC [main] SetOrdererEnv -> WARN 002 CORE_LOGGING_LEVEL is no longer supported, please use the FABRIC_LOGGING_SPEC environment variable
2018-12-17 15:03:20.980 UTC [chaincodeCmd] chaincodeInvokeOrQuery -> INFO 003 Chaincode invoke successful. result: status:200 payload:"\"Hello from Fabric\"" 
```

### Metadata

One of the new features of the 1.4.0 programming model is the metadata that is available from the chaincode container. This describes what transaction functions are available

This is obtained by invoking a transction, but on a different function. Here we're also using `gawk` and `jq` to format the output. You may need to install these two tools; otherwise remove the end of the command from 2>&1 to the ends

```bash
docker exec cli peer chaincode invoke --orderer orderer.example.com:7050 --channelID mychannel -c '{"Args":["org.hyperledger.fabric:GetMetadata"]}' -n hellonet 2>&1 | gawk -e 'match($0, /payload:(.*)$/, a) {print a[1]}' | jq 'fromjson'
{
  "contracts": {
    "MyContract": {
      "name": "MyContract",
      "contractInstance": {
        "name": "MyContract",
        "default": true
      },
      "transactions": [
        {
          "name": "instantiate"
        },
        {
          "name": "setGreeting"
        },
        {
          "name": "getGreeting"
        }
      ],
      "info": {
        "title": "",
        "version": ""
      }
    },
    "org.hyperledger.fabric": {
      "name": "org.hyperledger.fabric",
      "contractInstance": {
        "name": "org.hyperledger.fabric"
      },
      "transactions": [
        {
          "name": "GetMetadata"
        }
      ],
      "info": {
        "title": "",
        "version": ""
      }
    }
  },
  "info": {
    "version": "0.0.1",
    "title": "greetingContract-ts"
  },
  "components": {
    "schemas": {}
  }
}
```

The data that is available initially is basic, but it has a lot more power, with a few simple changes.