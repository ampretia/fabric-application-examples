import ISerializer from './serializer';
import State from './state';

export default class JSONSerializer implements ISerializer {

    public supportedTypes: object;

    public constructor() {
        this.supportedTypes = {};
    }

    public use(stateClass: object, type: string): void {
        this.supportedTypes[type] = stateClass;
    }

    public fromBuffer(buffer: Buffer): State {
        const json = JSON.parse(buffer.toString());
        console.log(json);
        const objClass = this.supportedTypes[json.type];
        if (!objClass) {
            throw new Error(`Unknown type of ${json.type}`);
        }
        const object = new(objClass)(json);

        return object;
    }

    public toBuffer(state: State): Buffer {
        return Buffer.from(JSON.stringify(state));
    }

}
