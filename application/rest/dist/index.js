'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/*
* Copyright IBM Corp All Rights Reserved
*
* SPDX-License-Identifier: Apache-2.0
*/
/*
 * Chaincode query
 */
const express = require("express");
const fabricproxy_1 = require("./fabricproxy");
const jsome = require("jsome");
const fs_1 = require("fs");
async function main() {
    try {
        let fabricProxy = new fabricproxy_1.default();
        let metadata = await fabricProxy.getMetaData();
        fs_1.writeFileSync('metadata.json', JSON.stringify(metadata));
        // openapi spec blank
        const swagger = {
            info: {},
            openapi: '3.0.0',
            paths: {},
            schemas: {},
        };
        const app = express();
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
        app.get('/swagger.json', (req, res) => {
            res.json(swagger);
        });
        const typeConverter = (type) => {
            if (type === 'String') {
                return 'string';
            }
        };
        // get the assets and add these as the schemas
        // const assets: any = metadata[''].assets;
        // for (const name of Object.keys(assets)) {
        //     const asset = assets[name];
        //     const { properties } = asset;
        //     const propertyNames = properties.map((property) => property.name );
        //     const swaggerProperties = {};
        //     for (const property of properties) {
        //         swaggerProperties[property.name] = { type: 'string' };
        //     }
        //     swagger.schemas[name] = {
        //         properties: swaggerProperties,
        //         required:  propertyNames,
        //         type: 'object',
        //     };
        // }
        // add the info section
        let contracts = metadata['contracts'];
        swagger.info = contracts[0]['info'];
        for (const contract of metadata['contracts']) {
            // get the transactions and add these including parameters
            for (const transaction of contract['operations']) {
                jsome(transaction);
                const name = transaction['operationId'];
                console.log(name);
                const { parameters } = transaction;
                let commit = transaction.tag[0] === 'submitTx';
                parameters.shift();
                const swaggerParameters = parameters.map((parameter) => {
                    return {
                        in: 'query',
                        name: parameter.name,
                        required: true,
                        schema: parameter.schema,
                    };
                });
                if (commit) {
                    swagger.paths[`/${contract['namespace']}/${name}`] = {
                        post: {
                            operationId: name,
                            parameters: swaggerParameters,
                            responses: {
                                200: {
                                    description: 'successful operation',
                                },
                            },
                        },
                    };
                    app.post(`/${contract['namespace']}/${name}`, async (req, res) => {
                        const args = swaggerParameters.map((swaggerParameter) => {
                            if (swaggerParameter.in === 'query') {
                                return req.query[swaggerParameter.name];
                            }
                        });
                        const data = await fabricProxy.submitTransaction(contract['namespace'], name, ...args);
                        if (data && data.length > 0) {
                            res.json(JSON.parse(data.toString()));
                        }
                        else {
                            res.sendStatus(204);
                        }
                    });
                }
                else {
                    swagger.paths[`/${name}`] = {
                        get: {
                            operationId: name,
                            parameters: swaggerParameters,
                            responses: {
                                200: {
                                    description: 'successful operation',
                                },
                            },
                        },
                    };
                    // app.get(`/${name}`, async (req: express.Request, res: express.Response) => {
                    //     const args = swaggerParameters.map((swaggerParameter) => {
                    //         if (swaggerParameter.in === 'query') {
                    //             return req.query[swaggerParameter.name];
                    //         }
                    //     });
                    //     const data = await contract.executeTransaction(name, ...args);
                    //     if (data && data.length > 0) {
                    //         res.json(JSON.parse(data.toString()));
                    //     } else {
                    //         res.sendStatus(204);
                    //     }
                    // });
                }
            }
        }
        const port = 3000;
        jsome(swagger);
        fs_1.writeFileSync('swagger.json', JSON.stringify(swagger));
        app.listen(port);
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
}
main();
