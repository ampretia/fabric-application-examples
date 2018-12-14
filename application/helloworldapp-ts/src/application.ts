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
import * as path from 'path';

import { FileSystemWallet, Gateway } from 'fabric-network';
import GreetingAPI from './greetingapi';

const walletPath = path.resolve(__dirname, '../_idwallet');
// A wallet stores a collection of identities for use
const wallet = new FileSystemWallet(walletPath);
const fixtures = path.resolve(__dirname, '../local_fabric');

async function main() {

    // A gateway defines the peers used to access Fabric networks
    const gateway = new Gateway();

    // Main try/catch block
    try {

        // define the identity to use
        const identityLabel = 'User1@org1.example.com';

        const ccpPath = path.join(fixtures, 'connection.json');

        // Load connection profile; will be used to locate a gateway
        const connectionProfile = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

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

        const greetingAPI = new GreetingAPI(network);
        await greetingAPI.init('helloworld-ts');

        const texttosend = 'Hi there!!';
        const sentGreeting = {
            text: texttosend,
            textLength: texttosend.length,
            wordCount: texttosend.split(' ').length,
        };
        console.log(`\n>> Setting greating to 'Hi there!!'`);
        const text1 = await greetingAPI.setGreeting(sentGreeting);
        console.log('>> Greeting set');
        console.log(text1);

        const text = await greetingAPI.getGreetingText();
        console.log(`\n>> The greeting is '${text}'`);

        const userName = process.env.USERNAME  || 'fred';
        await greetingAPI.setGreetingText(`Hello World ${userName}!!`);

        const text3 = await greetingAPI.paragraph();
        console.log(`\n ${text3}`)

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
