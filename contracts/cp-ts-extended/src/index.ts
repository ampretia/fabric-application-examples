/*
SPDX-License-Identifier: Apache-2.0
*/

import CommercialPaperContract from './papernet/papercontract';
export { CommercialPaper } from './datamodel/paper';

export const contracts: any[] = [ CommercialPaperContract ];

import ISerializer from './ledger/serializer';
import StateSerializerFactory from './ledger/StateSerializerFactory';

export { ISerializer, StateSerializerFactory};
