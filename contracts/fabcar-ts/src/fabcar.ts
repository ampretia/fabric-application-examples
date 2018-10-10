/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Asset, Context, Contract, Property, Transaction } from 'fabric-contract-api';

// tslint:disable max-classes-per-file

@Asset()
class Car {

    @Property()
    public color: string;

    @Property()
    public make: string;

    @Property()
    public model: string;

    @Property()
    public owner: string;

}

export class FabCar extends Contract {

    @Transaction()
    public async instantiate(ctx: Context) {
        // do nothing
    }

    @Transaction(false)
    public async queryCar(ctx: Context, carNumber: string): Promise<Buffer> {
        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.toString().length <= 0) {
            throw new Error(carNumber + ' does not exist: ');
        }
        console.log(carAsBytes.toString());
        return carAsBytes;
    }

    @Transaction()
    public async initLedger(ctx: Context) {
        console.info('============= START : Initialize Ledger ===========');
        const cars = [];
        cars.push({
            color: 'blue',
            make: 'Toyota',
            model: 'Prius',
            owner: 'Tomoko',
        });
        cars.push({
            color: 'red',
            make: 'Ford',
            model: 'Mustang',
            owner: 'Brad',
        });
        cars.push({
            color: 'green',
            make: 'Hyundai',
            model: 'Tucson',
            owner: 'Jin Soo',
        });
        cars.push({
            color: 'yellow',
            make: 'Volkswagen',
            model: 'Passat',
            owner: 'Max',
        });
        cars.push({
            color: 'black',
            make: 'Tesla',
            model: 'S',
            owner: 'Adriana',
        });
        cars.push({
            color: 'purple',
            make: 'Peugeot',
            model: '205',
            owner: 'Michel',
        });
        cars.push({
            color: 'white',
            make: 'Chery',
            model: 'S22L',
            owner: 'Aarav',
        });
        cars.push({
            color: 'violet',
            make: 'Fiat',
            model: 'Punto',
            owner: 'Pari',
        });
        cars.push({
            color: 'indigo',
            make: 'Tata',
            model: 'Nano',
            owner: 'Valeria',
        });
        cars.push({
            color: 'brown',
            make: 'Holden',
            model: 'Barina',
            owner: 'Shotaro',
        });

        for (let i = 0; i < cars.length; i++) {
            cars[i].docType = 'car';
            await ctx.stub.putState('CAR' + i, Buffer.from(JSON.stringify(cars[i])));
            console.info('Added <--> ', cars[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    @Transaction()
    public async createCar(ctx: Context, carNumber: string, make: string, model: string, color: string, owner: string) {
        console.info('============= START : Create Car ===========');

        const car = {
            color,
            docType: 'car',
            make,
            model,
            owner,
        };

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : Create Car ===========');
    }

    @Transaction(false)
    public async queryAllCars(ctx: Context): Promise<Buffer> {

        const startKey = 'CAR0';
        const endKey = 'CAR999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                const jsonRes: any = {};
                console.log(res.value.value.toString('utf8'));

                jsonRes.Key = res.value.key;
                try {
                    jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    jsonRes.Record = res.value.value.toString('utf8');
                }
                allResults.push(jsonRes);
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return Buffer.from(JSON.stringify(allResults));
            }
        }
    }

    @Transaction()
    public async changeCarOwner(ctx: Context, carNumber: string, newOwner: string) {
        console.info('============= START : changeCarOwner ===========');

        const carAsBytes = await ctx.stub.getState(carNumber);
        const car = JSON.parse(carAsBytes.toString());
        car.owner = newOwner;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');
    }

}