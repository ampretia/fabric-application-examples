/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
import { FileSystemWallet, X509WalletMixin } from 'fabric-network';
import * as fs from 'fs';
import * as path from 'path';

const fixtures = path.resolve(__dirname, '../../../infrastructure/basic-network');

// A wallet stores a collection of identities for use
const wallet = new FileSystemWallet('./_idwallet');

async function main() {

    // Main try/catch block
    try {

        // define the identity to use
        const credPath = path.join(fixtures , '/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com');
        const cert = fs.readFileSync(path.join(credPath , '/msp/signcerts/Admin@org1.example.com-cert.pem')).toString();
        const key = fs.readFileSync(path.join(credPath , '/msp/keystore/cd96d5260ad4757551ed4a5a991e62130f8008a0bf996e4e4b84cd097a747fec_sk')).toString();
        const identityLabel = 'Admin@org1.example.com';

        // prep wallet and test it at the same time
        await wallet.import(identityLabel, X509WalletMixin.createIdentity('Org1MSP', cert, key));

    } catch (error) {
        console.log(`Error adding to wallet. ${error}`);
        console.log(error.stack);
    }
}

main().then(() => {
    console.log('done');
}).catch((e) => {
    console.log(e);
    console.log(e.stack);
    process.exit(-1);
});
