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
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as jsome from 'jsome';
import * as path from 'path';

import { FileSystemWallet, Gateway } from 'fabric-network';

// A wallet stores a collection of identities for use
const wallet = new FileSystemWallet('./_idwallet');
const fixtures = path.resolve(__dirname, '../../../infrastructure/basic-network');

async function main() {

    // A gateway defines the peers used to access Fabric networks
    const gateway = new Gateway();

    // Main try/catch block
    try {

        // define the identity to use
        const identityLabel = 'User1@org1.example.com';

        const ccpPath = path.join(fixtures, 'network.yaml');

        // Load connection profile; will be used to locate a gateway
        const connectionProfile = yaml.safeLoad(fs.readFileSync(ccpPath, 'utf8'));

        // Set connection options; use 'admin' identity from application wallet
        const connectionOptions = {
            discovery: { enabled: false, asLocalhost: true },
            identity: identityLabel,
            wallet,
        };

        // Connect to gateway using application specified parameters
        await gateway.connect(connectionProfile, connectionOptions);

        console.log('Connected to Fabric gateway.');

        // Get addressability to PaperNet network
        const network = await gateway.getNetwork('mychannel');

        // Get addressability to commercial paper contract
        const contract = await network.getContract('hellonet', 'Greeting');

        // get and print out neatly the metadata
        // const metadata = await contract.getMetadata();
        // jsome(metadata);

        // issue commercial paper
        const setGreeting = await contract.createTransaction('setGreeting');
        const getGreeting = await contract.createTransaction('getGreeting');

        const sentGreeting = { text: 'Hello World'};
        console.log(`\n >> Setting greating to 'Hello World'`);
        await setGreeting.submit(JSON.stringify(sentGreeting));

        console.log('>> Greeting set');

        const receivedGreeting = await getGreeting.evaluate();
        // we know from the metadata that this is a of an object type, and the structure of it
        // therefore we can demarshall this into a the string greeting
        const demarshalled = JSON.parse(receivedGreeting.toString());
        console.log(`\n >> The greeting is '${demarshalled.text}`);

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
main().then(() => {
    console.log('done');
}).catch((e) => {
    console.log('Final error checking.......');
    console.log(e);
    console.log(e.stack);
    process.exit(-1);
});
