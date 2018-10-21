# Fabric 1.4 - All new Programming Model 

## Introduction

Many years ago when I was learning the craft of programming the phrases High Level and Low Level programming languages were heard a lot more frequently than today. Frequently your chosen programming approach couldn't provide the features you needed and you had to 'drop down' to a low level. 

Though I was to learn the formal definition of the word abstraction a latter the concept of different levels of abstraction was already well known to me. 

We might not hear the phrases much any more - but the concepts are still very much present. Perhaps in the web development world jQuery provided a high level of abstraction across different browsers, and let developers write more about the general concept of the DOM.

You may have heard of something called Blockchain - and Smart Contracts; Hyperledger Fabric provides a permissioned ledger that supports Smart Contracts using general purposes languages  (NodeJS, Go, Java).  

What is available - in the current development stream so you have chance to help shape it - is a high level of abstraction to help develop smart contracts.

## All new?
Well maybe not *all* new; we're buildling upon, not destroying the foundations laid by the existing concepts in Hyperledger Fabric - and bring the experience of Hyperledger Composer to aim high.

>All available in the master branch - feedback will help shape the future!

## Chanincode, Smart Contracts, and SDKs

As with many systems - you'll have some code is running 'server side', 'in the cloud' etc. And some code that is acting as a trigger, a local application, an API etc.

The 'server side' piece of the code 

## Quick recap

Working with NodeJs,today a Hyperledger Fabric chaincode (Smart Contract) is written to implement two methods `init` and `invoke`.  

Lifecycle of the chaincode container is that you 'install' the chaincocde, you then 'instantiate' it at which point a docker image is created with your code inside, this is then started. (and the init function is called)

Applications can then call functions with data (called submitting a transaction) - the `invoke` function being called with the data. 
Chaincode can be updated with new code, at which point the process is similar. The code is installed, and `updgrade` command is issued, and the `init` funciton is again called should any data migration need to occur.  

Within your code, you have access to an API that permits you to manipulate 'world state', along with various other functions such as encrypting data, accessing who submitted the transaction. Data can be returned. 

The difference between the world state before and after the transaciton forms a 'read write set' and it is this that is the basis of what is written to the ledger. 

## What is different now?

What we found was that people invariably had various named functions in the Smart Contracts; say 'issue' 'buy' 'redeem'. As all of these are routed via a single `invoke` funciton invariably some additional logic had to be written to separate out say the 'issue' from the 'buy'.

This is repeated over and over again, plus with a general array of arguments, any concept of type safetly is lost. 

We now have a highlevel of abstraction that does a lot of the common work for you. 

## Smart Contract - 'hello world'

Let's consider the classic Hello World, but in a Smart Contract; not a great blockchain use-case but the point here is to showcase the API and structure you need.
Create a working directory, and within that a directory for the smart contract

### Creating the code

```
$ mkdir my-fabric-examples
$ mkdir my-fabric-examples/contract
```

Install the Yeoman tool, and the generator for fabric.

```
$ npm install -g yo generator-fabric
```

.. change into the contract directory and then run the Fabric Contract generator.  This will ask a number of questions.

```
$ yo                                                                                                        
? 'Allo matthew! What would you like to do? Fabric

Make sure you are in the directory you want to scaffold into.
This generator can also be run with: yo fabric

? Please specify the generator to run: Contract
This generator can also be run with: yo fabric:contract
? Please specify the contract language: TypeScript
? Please specify the contract name: helloworld-ts
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

Once installed, using your favourite editor, look into the my-contract.ts file. 

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

```
    public async instantiate(ctx: Context): Promise<any> {
        let greeting = { text: 'Hi' };
        await ctx.stub.putState('GREETING', Buffer.from(JSON.stringify(greeting)));
    }
```

We're using the `ctx.stub` to access the API, and `putState` updates the state keyed by 'GREETING', to a buffer of JSON data.

The `setGreeting` function is 
```
    public async setGreeting(ctx: Context, greeting: string): Promise<any> {
        await ctx.stub.putState('GREETING', Buffer.from(JSON.stringify(greeting)));
        console.info(`setGreeting to ${greeting['text']}`);
    }
```

Very similar in structure to the instantiate but the data is coming from the arguements.B

Finally `getGreeting` is probably not surprising; we're returning the buffer directory

```
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

Look into the `my-contract.spec.ts` file, and you will see this is setup with the 3 tests already. This is using the mocha
framework with the chai and sinon assertion and stubbing libraries.

We can modify these tests to match our updated functions as follows. As theses are Typescript files, note there are a few differences to ensure type safety is maintained.

Instantiate function is tested as follows
```
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

```
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

