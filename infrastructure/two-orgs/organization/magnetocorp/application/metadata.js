/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
let jsome = require('jsome');
// A wallet stores a collection of identities for use
const wallet = new FileSystemWallet('./fabric-wallet');

async function main(){

    // A gateway defines the peers used to access Fabric networks
    const gateway = new Gateway();

    // Main try/catch block
    try {

        // define the identity to use
        const identityLabel = 'Admin@magnetocorp.example.com';
        //const identityLabel = 'admintls';

        // Load connection profile; will be used to locate a gateway
        let connectionProfile = yaml.safeLoad(fs.readFileSync('../../networkConnection.tls.1.yaml', 'utf8'));

        // Set connection options; use 'admin' identity from application wallet
        let connectionOptions = {
            identity:identityLabel,//'admin',
            wallet: wallet,
            discovery: { enabled:true, asLocalhost: true},
            clientTlsIdentity:identityLabel// 'admintls'
        };

        // Connect to gateway using application specified parameters
        await gateway.connect(connectionProfile, connectionOptions);

        // console.log('Connected to Fabric gateway.');

        // Get addressability to PaperNet network
        const network = await gateway.getNetwork('papernet');

        // Get addressability to commercial paper contract
        const contract = await network.getContract('papercontract');

        //console.log('\nSubmit metdata request');

        // issue commercial paper
        const response = await contract.submitTransaction('org.hyperledger.fabric:GetMetadata');
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

main().then(()=>{
    //console.log('done');
}).catch((e)=>{
    console.log('Final error checking.......');
    console.log(e);
    console.log(e.stack);
    process.exit(-1);
});