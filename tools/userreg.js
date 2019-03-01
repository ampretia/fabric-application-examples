'use strict';

const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
const fs = require('fs');
const path = require('path');

// argv arguments : Orgname (eg 'Org1')  : username1 : username2 : username3 :  blah blah
// arg 0 and 1 are system process args FYI

let orgName = process.argv[2]; 
const ccpPath = path.resolve(process.cwd(), 'local_fabric', 'connection.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);


// stash the user args into an array for now  - can generate whatever name you want - for that Org's CA FYI
let users = [];
for (let j = 3; j < process.argv.length; j++) {   // first 2 params are process, then 1 org parameter, then users [3] onwards
console.log('argument is ' + j + ' -> ' + (process.argv[j]));
users.push(process.argv[j]);
}


// register ordinary users main function

async function main() {
    try {

        const admwalletPath = path.join(process.cwd(), 'local_fabric', 'wallet');
        console.log("admin wallet path is " + admwalletPath);
        const wallet = new FileSystemWallet(admwalletPath);
        console.log(`Wallet path: ${admwalletPath}`);
        const adminExists = await wallet.exists(`Admin@${orgName}`);
        if (!adminExists) {
        	console.log('An identity for the admin user "admin" does not exist in the wallet');
                console.log('Run the enrollAdmin.js application before retrying');
                return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: `Admin@${orgName}`, discovery: { enabled: false ,  asLocalhost: true } });
        console.log('Connected')
        // Get the CA client object from the gateway for interacting with the CA.
        const ca = gateway.getClient().getCertificateAuthority();
        console.log(ca); 

        const adminIdentity = gateway.getCurrentIdentity();
        console.log(adminIdentity)
        
        for (let user of users ) {
            console.log('Now trying to register ordinary user......' + user);
            // Create a new file system based wallet for managing identities.
            const walletPath = path.join(process.cwd(), 'local_fabric','wallet',orgName);
            const wallet = new FileSystemWallet(walletPath);
            console.log(`Wallet path: ${walletPath}`);


            // Check to see if we've already enrolled the user.
            const userExists = await wallet.exists(user);
            if (userExists) {
               console.log('An identity for the user ' + user + ' already exists in the wallet');
               return;
            }


            // Register the user, enroll the user, and import the new identity into the wallet.
            const secret = await ca.register({ affiliation: 'org1.department1', enrollmentID: user, role: 'client' }, adminIdentity);
            console.log(secret);
            const enrollment = await ca.enroll({ enrollmentID: user, enrollmentSecret: secret });
            console.log(enrollment)
            const userIdentity = X509WalletMixin.createIdentity(ccp.organizations[orgName].mspid, enrollment.certificate, enrollment.key.toBytes());
            wallet.import(user, userIdentity);
            console.log('Successfully registered and enrolled user ' + user + ' and imported it into the wallet' + walletPath);
        }
    } catch (error) {
        console.error(`Failed to enroll admin user "admin": ${error}`);
        process.exit(1);
    }
}

main();
