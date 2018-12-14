/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
import { FileSystemWallet, X509WalletMixin } from 'fabric-network';
import * as fs from 'fs';
import * as path from 'path';

const fixtures = path.resolve(__dirname, '../local_fabric');
const walletPath = path.resolve(__dirname, '../_idwallet');

// A wallet stores a collection of identities for use
const wallet = new FileSystemWallet(walletPath);

async function main() {

    // Main try/catch block
    try {

        // define the identity to use

        const cert = fs.readFileSync(path.join(fixtures, 'certificate')).toString();
        const key = fs.readFileSync(path.join(fixtures, 'privateKey')).toString();
        const identityLabel = 'User1@org1.example.com';

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
