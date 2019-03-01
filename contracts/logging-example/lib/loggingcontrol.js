/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class LoggingControl extends Contract {

    async getLogLevel(ctx) {
        return process.env.CORE_CHAINCODE_LOGGING_SHIM
    }

    async setLogLevel(ctx,loglevel){
        const logger = ctx.logging.getLogger()
        ctx.logging.setLevel(loglevel);

        logger.info('Updated the log level to ',loglevel)
        
        return loglevel;
    }

}

module.exports = LoggingControl;
