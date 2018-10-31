/*
SPDX-License-Identifier: Apache-2.0
*/

import CommercialPaperContract from './papernet/papercontract';
export { CommercialPaper } from './papernet/paper';
export const contracts: any[] = [ CommercialPaperContract ];

// ------------------------------------
import ISerializer from './ledger-api/serializer';
import StateSerializerFactory from './ledger-api/StateSerializerFactory';
export { ISerializer, StateSerializerFactory};
