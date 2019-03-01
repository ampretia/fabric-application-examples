'use strict';

const FabricCAServices = require('fabric-ca-client');
const { FileSystemWallet, X509WalletMixin } = require('fabric-network');
const fs = require('fs');
const path = require('path');

let orgName = process.argv[2];
let conxfile = process.argv[3];
const ccpPath = path.resolve(__dirname, '..', 'GW', 'connection.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

async function main() {
    try {

        // Create a new CA client for interacting with the CA.
        console.log('ca name  derived from CCP is ' + ccp.organizations[orgName].certificateAuthorities[0]);
        const caName = ccp.organizations[orgName].certificateAuthorities[0];
        const caURL = ccp.certificateAuthorities[caName].url;
        console.log('ca url  is ' + ccp.certificateAuthorities[caName].url);
        const ca = new FabricCAServices(caURL);

        // Create a new file system based wallet for managing the admin identity, for that Org CA.
        const walletPath = path.join(process.cwd(), 'wallet/',orgName);
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        const adminExists = await wallet.exists('admin');
        if (adminExists) {
            console.log('An identity for the admin user "admin" already exists in the wallet for the CA for ' + orgName);
            return;
        }

        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
        const identity = X509WalletMixin.createIdentity(ccp.organizations[orgName].mspid, enrollment.certificate, enrollment.key.toBytes());
        wallet.import('admin', identity);
        console.log('Successfully enrolled admin user "admin" and imported it into the wallet ' + walletPath);

    } catch (error) {
        console.error(`Failed to enroll admin user "admin": ${error}`);
        process.exit(1);
    }
}

main();
