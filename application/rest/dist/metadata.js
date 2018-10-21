/*
SPDX-License-Identifier: Apache-2.0
*/
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require("fs");
const yaml = require("js-yaml");
const fabric_network_1 = require("fabric-network");
const jsome = require("jsome");
// A wallet stores a collection of identities for use
const wallet = new fabric_network_1.FileSystemWallet('./_idwallet');
async function main() {
    // A gateway defines the peers used to access Fabric networks
    const gateway = new fabric_network_1.Gateway();
    // Main try/catch block
    try {
        // define the identity to use
        const identityLabel = 'User1@org1.example.com';
        // Load connection profile; will be used to locate a gateway
        let connectionProfile = yaml.safeLoad(fs.readFileSync('../../infrastructure/basic-network/network.yaml', 'utf8'));
        // Set connection options; use 'admin' identity from application wallet
        let connectionOptions = {
            identity: identityLabel,
            wallet: wallet
        };
        // Connect to gateway using application specified parameters
        await gateway.connect(connectionProfile, connectionOptions);
        // console.log('Connected to Fabric gateway.');
        // Get addressability to PaperNet network
        const network = await gateway.getNetwork('mychannel');
        // Get addressability to commercial paper contract
        const contract = await network.getContract('papernet');
        //console.log('\nSubmit metdata request');
        // issue commercial paper
        const response = await contract.executeTransaction('org.hyperledger.fabric:getMetaData');
        console.log(response.toString());
        jsome(JSON.parse(response.toString()));
    }
    catch (error) {
        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);
    }
    finally {
        // Disconnect from the gateway
        console.log('Disconnect from Fabric gateway.');
        gateway.disconnect();
    }
}
main().then(() => {
    //console.log('done');
}).catch((e) => {
    console.log('Final error checking.......');
    console.log(e);
    console.log(e.stack);
    process.exit(-1);
});
