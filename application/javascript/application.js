/*
SPDX-License-Identifier: Apache-2.0
*/

/*
 * This application has 6 basic steps:
 * 1. Select an identity from a wallet
 * 2. Connect to network gateway
 * 3. Access PaperNet network
 * 4. Construct request to issue commercial paper
 * 5. Submit transaction
 * 6. Process response
 */

'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const { CommercialPaper } = require('../../contracts/javascript/');

// A wallet stores a collection of identities for use
const wallet = new FileSystemWallet('./_idwallet');

async function main(){

    // A gateway defines the peers used to access Fabric networks
    const gateway = new Gateway();

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

        console.log('Connected to Fabric gateway.');

        // Get addressability to PaperNet network
        const network = await gateway.getNetwork('mychannel');

        // Get addressability to commercial paper contract
        const contract = await network.getContract('papernet', 'org.papernet.commercialpaper');

        console.log('\nSubmit commercial paper issue transaction.');

        // issue commercial paper
        const response = await contract.submitTransaction('issue', 'MagnetoCorp', '00001', '2020-05-31', '2020-11-30', '5000000');
        let paper = CommercialPaper.deserialize(response);

        console.log(`${paper.issuer} commercial paper : ${paper.paperNumber} successfully issued for value ${paper.faceValue}`);
        console.log('Transaction complete.\n');

        console.log('Submit commercial paper buy transaction.');

        // buy commercial paper
        const buyresponse = await contract.submitTransaction('buy', 'MagnetoCorp', '00001', 'MagnetoCorp','DigiBank', '4900000','2020-05-31',);
        paper = CommercialPaper.deserialize(buyresponse);

        console.log(`${paper.issuer} commercial paper : ${paper.paperNumber} successfully purchased by ${paper.owner}`);
        console.log('Transaction complete.\n');

        console.log('Submit commercial paper redeem transaction.');

        // issue commercial paper
        const redeemresponse = await contract.submitTransaction('redeem', 'MagnetoCorp', '00001', 'DigiBank',  '2020-11-30');
        paper = CommercialPaper.deserialize(redeemresponse);

        console.log(`${paper.issuer} commercial paper : ${paper.paperNumber} successfully redeemed`);
        console.log('Transaction complete.\n');

    } catch (error) {
        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);
    } finally {
        // Disconnect from the gateway
        console.log('Disconnect from Fabric gateway.');
        gateway.disconnect();
    }
}

// invoke the main function, can catch any error that might escape
main().then(()=>{
    console.log('done');
}).catch((e)=>{
    console.log('Final error checking.......');
    console.log(e);
    console.log(e.stack);
    process.exit(-1);
});