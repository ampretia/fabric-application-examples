/*
SPDX-License-Identifier: Apache-2.0
*/
'use strict';

import { StateList } from '../ledger-api/statelist';
import { CommercialPaper } from './paper';

export class PaperList extends StateList {

    constructor(ctx) {
        super(ctx, 'org.papernet.commercialpaperlist');
        this.use(CommercialPaper, CommercialPaper.getType());
    }

    public async addPaper(paper) {
        return this.addState(paper);
    }

    public async getPaper(paperKey) {
        return this.getState(paperKey);
    }

    public async updatePaper(paper) {
        return this.updateState(paper);
    }
}
