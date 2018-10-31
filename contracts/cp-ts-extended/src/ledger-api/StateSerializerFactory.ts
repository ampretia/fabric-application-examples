import JSONSerializer from './jsonserializer';
/*
SPDX-License-Identifier: Apache-2.0
*/
/**
 *
 */
export default class StateSerializerFactory {
    public static getLedgerSerializer() {
        return new JSONSerializer();
    }
    public static getTransactionSerializer() {
        return new JSONSerializer();
    }
}
