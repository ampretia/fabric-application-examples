
'use strict';

import { Asset, Property, State } from 'fabric-contract-api';

@Asset()
export default class Owner extends State {

    @Property()
    public name: string;
    @Property()
    public company: string;

    public constructor(obj: any) {
        super('org.example.Owner', obj);
        this.setKeyParts(['name']);
    }

}
