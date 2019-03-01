/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
let jsome = require('jsome');
// A wallet stores a collection of identities for use
const wallet = new FileSystemWallet('./fabric-wallet');
const readline = require('readline');
const chalk = require('chalk');
const homedir = require('homedir');
const path = require('path');
const yargs = require('yargs');
const mkdirp = require('mkdirp');
const inquirer = require('inquirer');
let contract;


const completions = [];
const log;
const metasummary = (metadata) => {
    let contractNames = Object.keys(metadata.contracts);
    contractNames.forEach((name) => {
        info();
        info(chalk`{bold ${name}}`);
        metadata.contracts[name].transactions.forEach((tx) => {
            info(tx.name);
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

                info(chalk`RAW result >{white ${result.toString('utf8')}}<`);
                if (result.toString('utf8') !== '') {
                    let obj = JSON.parse(result.toString());
                    jsome(obj);
                    if (obj.type && obj.type === 'Buffer') {
                        jsome(Buffer.from(obj.data).toString('utf8'));
                    }
                }

            } catch (error) {
                warn('Error processing transaction');
                info(error);
            }
        }
    }
];

const getconfig = async () => {
    let cfgPath = path.resolve(homedir(), '.fabric-devtools');
    if (!fs.existsSync(cfgPath)) {
        mkdirp.sync(cfgPath);
    }

    let cfgFile = path.join(cfgPath, 'config.json');
    let defaultconfig = {
        _settings: {
            tlsid: {
                name: 'tlsid',
                message: 'identity label?',
                type: 'input'
            }
        }
    };
    let config = {};
    if (fs.existsSync(cfgFile)) {
        config = JSON.parse(fs.readFileSync(cfgFile));
    }

    let cmdLineConfig = yargs.option('indentity', { alias: 'i', describe: 'identity label?', type: 'string', default: { q: '?' } }).argv;
    // Object.keys(cmdLineConfig).forEach(key => {
    //     config[key] = (key in config ? config[key] : cmdLineConfig[key]);
    // });
    Object.assign(config,cmdLineConfig);
    let questions = [];
    Object.keys(defaultconfig._settings).forEach(key => {
        if (!(key in config)) {
            questions.push(defaultconfig._settings[key]);
        }
    });
    console.log(questions);
    let answers = await inquirer.prompt(questions);
    // check for any missing
    // and run inquirer
    console.log(answers);

    // write back
    fs.writeFileSync(cfgFile, JSON.stringify(config));

    return config;
};

async function main(options,log) {
    log = log;
    let config = await getconfig();
    console.log(config);
    // A gateway defines the peers used to access Fabric networks
    const gateway = new Gateway();

    // Main try/catch block
    try {

        // define the identity to use
        const identityLabel = 'Admin@magnetocorp.example.com';
        //const identityLabel = 'admintls';

        // Load connection profile; will be used to locate a gateway
        let connectionProfile = yaml.safeLoad(fs.readFileSync('../../networkConnection.tls.1.yaml', 'utf8'));

        // Set connection options; use 'admin' identity from application wallet
        let connectionOptions = {
            identity: identityLabel,//'admin',
            wallet: wallet,
            discovery: { enabled: true, asLocalhost: true },
            clientTlsIdentity: identityLabel// 'admintls'
        };

        info('Connecting...');
        // Connect to gateway using application specified parameters
        await gateway.connect(connectionProfile, connectionOptions);

        // Get addressability to PaperNet network
        const network = await gateway.getNetwork('papernet');

        // Get addressability to commercial paper contract
        contract = await network.getContract('papercontract');

        const response = await contract.evaluateTransaction('org.hyperledger.fabric:GetMetadata');
        metasummary(JSON.parse(response.toString()));

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            completer
        });

        info('');
        const txRegex = /([s|e]) (.+)\(([^)]*)\)/;
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


                // if (ar) {

                // } else {
                //     warn(`Does not match valid command ${line}`)
                // }
            }

            rl.prompt();
        }).on('close', () => {
            info('Disconnect from Fabric gateway.');
            gateway.disconnect();
            info('Have a great day!');
            process.exit(0);
        });

        rl.prompt();

    } catch (error) {
        error(`Error: ${error}`);
        info(error.stack);
        // Disconnect from the gateway
        info.log('Disconnect from Fabric gateway.');
        gateway.disconnect();
    }
}

main().then(() => {

}).catch((e) => {
    warn(e);
    warn(e.stack);
    process.exit(-1);
});