# Running the Commercial Paper Smart Contract and Applications

## Prereqs

- Smart contract has been written, and is in source form in the `contracts/javascript` directory
- Fabric `basic-network` has been started in development mode, and the cli container is also running.

## Starting the smart contract locally
Development mode requires that the smart contract is run locally. By running the smart contract locally, you can choose to either output debug statements, or connect a debugger like Visual Studio Code.
For the purposes of this tutorial, we will deploy the JavaScript version of the smart contract.

1. Navigate to the `contracts/javascript` directory - this contains the code for the Smart Contract
2. Run the following command to install the smart contract dependencies:

        npm install
        
3. Next, start the smart contract in development mode by using the following command:

        $ $(npm bin)/fabric-chaincode-node start --peer.address=localhost:7052 --chaincode-id-name=papernet:0

To better understand this command, we'll break it down here. The `--chaincode-id-name` sets the identifier for the smart contract. The rest of the command, `$(npm bin)/fabric-chaincode-node start --peer.address=localhost:7052`, is the command to start the smart contract.

## Installing and instantiating the smart contract
Issue commands in another command window to interact with the smart contract.
1. Open a command window and navigate to the `basic-network` directory.
2. Run the following command to start the docker container that will handle `cli` commands:

        $ docker-compose -f ./docker-compose.yml up -d cli

3. Install the smart contract using the following command:

        $ docker exec cli peer chaincode install -n papernet -v 0 -p /opt/gopath/src/github.com/javascript -l node

4. Instantiate the smart contract using the following command:

        $ docker exec cli peer chaincode instantiate -n papernet -v 0 -l node -c '{"Args":["org.papernet.commercialpaper:instantiate"]}' -C papernet

## Running the PaperNet client application

Now that the smart contract has been installed and instantiated, and is running locally, the next step is to start the PaperNet sample application. The sample application serves as a demonstration of a client application invoking functions from a running smart contract.

### Setting up the client application

The client application is contained in the `application` directory of the sample.
1. Navigate to the `application/javascript` directory.
2. Run the following command to install the application dependencies:
        npm install
3. Now that everything has been installed, a local **idwallet** needs to be created that contains the credentials for a specific user, known to the Fabric infrastructure. Run the following command to create a local folder containing the required credentials:
        $ node addToWallet.js

### Running the client application

The client application can now issue transactions using the identity in the **idwallet**. Looking back at the PaperNet smart contract, there are **issue**, **buy**, and **redeem** transactions that can be performed on **commercial paper** assets.

1. To run the client application, run the following command:
        $ node application.js
    The application will connect to the Hyperledger Fabric instance, issue a commercial paper, buy the commercial paper, and redeem the commercial paper.