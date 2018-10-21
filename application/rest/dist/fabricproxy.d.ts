/// <reference types="node" />
import { FileSystemWallet } from 'fabric-network';
export default class FabricProxy {
    wallet: FileSystemWallet;
    constructor();
    getMetaData(): Promise<object>;
    submitTransaction(namespace: string, name: string, ...args: string[]): Promise<Buffer>;
}
