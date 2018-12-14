/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const { FileSystemWallet, Gateway } = require('fabric-network');
const jsome = require('jsome');
const readline = require('readline');
const chalk = require('chalk');

let contract;
let log;


const completions = [];

const metasummary = (metadata) => {
    let contractNames = Object.keys(metadata.contracts);
    contractNames.forEach((name) => {
        log.info();
        log.info(chalk`{bold ${name}}`);
        metadata.contracts[name].transactions.forEach((tx) => {
            log.info(tx.name);
            completions.push(tx.name);
        });
    });
};

const completer = (line) => {
    let l = line.trim().split(' ').pop();
    const hits = completions.filter((c) => c.startsWith(l));
    // show all completions if none found
    return [hits.length ? hits : completions, l];
};

const cmds = [
    {
        regex: /([s|e]) (.+)\(([^)]*)\)/,
        fn: async (ar) => {
            try {
                let submit = (ar[1] === 's');
                let fn = ar[2];
                let args = (ar[3] ? ar[3].split(',') : []).map(x => { return JSON.parse(x); });

                let result;

                if (submit) {
                    result = await contract.submitTransaction(`${fn}`, ...args);
                } else {
                    result = await contract.evaluateTransaction(`${fn}`, ...args);
                }

                log.info(chalk`RAW result >{white ${result.toString('utf8')}}<`);
                if (result.toString('utf8') !== '') {
                    let obj = JSON.parse(result.toString());
                    jsome(obj);
                    if (obj.type && obj.type === 'Buffer') {
                        jsome(Buffer.from(obj.data).toString('utf8'));
                    }
                }

            } catch (error) {
                log.warn('Error processing transaction');
                log.info(error);
            }
        }
    }
];



async function main(cfg,logger) {
    log = logger;
    // A gateway defines the peers used to access Fabric networks
    const gateway = new Gateway();
    // A wallet stores a collection of identities for use
    const wallet = new FileSystemWallet(cfg.walletpath);
    // Main try/catch block
    try {

        // define the identity to use
        const identityLabel = cfg.identitylabel;
        const tlsLabel = cfg.tlsidentitylabel;

        // Load connection profile; will be used to locate a gateway
        let connectionProfile = cfg.ccp;

        // Set connection options
        let connectionOptions = {
            identity: identityLabel,
            wallet: wallet,
            discovery: { enabled: true, asLocalhost: true },
            clientTlsIdentity: tlsLabel
        };

        log.info('Connecting...');
        // Connect to gateway using application specified parameters
        await gateway.connect(connectionProfile, connectionOptions);

        // Get addressability to PaperNet network
        const network = await gateway.getNetwork(cfg.channel);

        // Get addressability to commercial paper contract
        contract = await network.getContract(cfg.chaincodename);

        const response = await contract.evaluateTransaction('org.hyperledger.fabric:GetMetadata');
        metasummary(JSON.parse(response.toString()));

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            completer
        });

        log.info('');
        rl.on('line', async (line) => {
            line = line.trim();
            if (line !== '') {
                for (let index = 0; index < cmds.length; index++) {
                    const cmd = cmds[index];
                    let ar = line.match(cmd.regex);
                    if (ar) {
                        await cmd.fn(ar);
                        break;
                    }
                }
            }

            rl.prompt();
        }).on('close', () => {
            log.info('Disconnect from Fabric gateway.');
            gateway.disconnect();
            log.info('Have a great day!');
            process.exit(0);
        });

        rl.prompt();

    } catch (error) {
        error(`Error: ${error}`);
        log.info(error.stack);
        // Disconnect from the gateway
        log.info.log('Disconnect from Fabric gateway.');
        gateway.disconnect();
    }
}

module.exports = main;