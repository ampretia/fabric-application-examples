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

import * as path from 'path';

import { FileSystemWallet, GreetingAPI, ServiceFactory } from './greetingservice';

// Configuration of the gateway and wallet to use
const wallet = new FileSystemWallet(path.resolve(__dirname, '../local_fabric/wallet'));
const gatewayProfilePath = path.resolve(__dirname, '../local_fabric/connection.json');
const identityLabel = 'Admin@org1.example.com';
const connectOptions = {
    discovery: { enabled: false, asLocalhost: true },
    identity: identityLabel,
    wallet,
};

async function main() {
    let serviceFactory: ServiceFactory;
    // Main try/catch block
    try {

        serviceFactory = await ServiceFactory.configure(gatewayProfilePath, connectOptions);
        const greetingService =
            await serviceFactory.getServiceInstance('mychannel', 'helloworld-ts');

        const texttosend = 'Hi there!!';
        const sentGreeting = {
            text: texttosend,
            textLength: texttosend.length,
            wordCount: texttosend.split(' ').length,
        };
        console.log(`\n>> Setting greating to 'Hi there!!'`);
        const text1 = await greetingService.setGreeting(sentGreeting);
        console.log('>> Greeting set');
        console.log(text1);

        const text = await greetingService.getGreetingText();
        console.log(`\n>> The greeting is '${text}'`);

        const userName = process.env.USERNAME || 'fred';
        await greetingService.setGreetingText(`Hello World ${userName}!!`);

        const text3 = await greetingService.getGreeting();
        console.log(`\n>> The greeting is '${text}'`);
        console.log(`\n ${JSON.stringify(text3)}`);

    } catch (error) {
        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);
    } finally {
        // Disconnect from the gateway
        console.log('Disconnect from Fabric gateway.');
        serviceFactory.disconnect();
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
