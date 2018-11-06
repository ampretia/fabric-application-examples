
'use strict';

const { State } = require('fabric-contract-api');

module.exports = class Commodity extends State {

    constructor(obj,keyParts){
        super('org.example.Commodity',keyParts,obj);
    }

    getTradingSymbol(){
        return this.tradingSymbol;
    }

    getDescription(){
        return this.description;
    }

    getQuantity(){
        return this.quantity;
    }

    getOwner(){
        return this.owner;
    }

};
