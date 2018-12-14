/*
 *  SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const { FileSystemWallet, X509WalletMixin } = require('fabric-network');
const path = require('path');

const fixtures = path.resolve(__dirname, '../../../commercial-paper-network/');

// A wallet stores a collection of identities
const wallet = new FileSystemWallet('./fabric-wallet');

async function main() {

    // Main try/catch block
    try {

        // Identity to credentials to be stored in the wallet
        const credPath = path.join(fixtures, '/crypto-config/peerOrganizations/magnetocorp.example.com/users/Admin@magnetocorp.example.com');
        const cert = fs.readFileSync(path.join(credPath, '/msp/signcerts/Admin@magnetocorp.example.com-cert.pem')).toString();
        const key = fs.readFileSync(path.join(credPath, '/msp/keystore/8401e58b739fb67ed6c8b3d4c52256de36a613657618cf614768fef71326504c_sk')).toString();

        // Load credentials into wallet
        const identityLabel = 'Admin@magnetocorp.example.com';
        const identity = X509WalletMixin.createIdentity('magnetocorpMSP', cert, key);

        await wallet.import(identityLabel, identity);

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