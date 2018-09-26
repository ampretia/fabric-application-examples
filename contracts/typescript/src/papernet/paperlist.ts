/*
SPDX-License-Identifier: Apache-2.0
*/
'use strict';

import { StateList } from '../ledger/ledgerutils';
import { CommercialPaper } from './paper';

export class PaperList extends StateList{

    constructor(ctx){
        super(ctx, 'org.papernet.commercialpaperlist');
        this.use(CommercialPaper);
    }

    async addPaper(paper){
        return this.addState(paper);
    }

    async getPaper(paperKey){
        return this.getState(paperKey);
    }

    async updatePaper(paper){
        return this.updateState(paper);
    }
}
