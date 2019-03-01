/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
let jsome = require('jsome');

async function main(options){

    // A gateway defines the peers used to access Fabric networks
    const gateway = new Gateway();
    const wallet = new FileSystemWallet(path.resolve(options.walletPath));

    // Main try/catch block
    try {

        // define the identity to use
        const identityLabel = options.identityLabel;//'User1@org1.example.com';

        // Load connection profile; will be used to locate a gateway
        let connectionProfile = options.ccp;//yaml.safeLoad(fs.readFileSync('../../infrastructure/basic-network/network.yaml', 'utf8'));

        // Set connection options; use 'admin' identity from application wallet
        let connectionOptions = {
            identity: identityLabel,
            wallet: wallet
        };

        // Connect to gateway using application specified parameters
        await gateway.connect(connectionProfile, connectionOptions);

        // Get addressability to PaperNet network
        const network = await gateway.getNetwork(options.channelName);

        // Get addressability to commercial paper contract
        const contract = await network.getContract(options.chaincodeName);

        //console.log('\nSubmit metdata request');

        // issue commercial paper
        const response = await contract.evaluateTransaction('org.hyperledger.fabric:GetMetadata');
        jsome(JSON.parse(response.toString()));

    } catch (error) {
        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);
    } finally {
        // Disconnect from the gateway
        console.log('Disconnect from Fabric gateway.');
        gateway.disconnect();
    }
}

module.exports = main;