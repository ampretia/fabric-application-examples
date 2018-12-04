const Contract = require('./superclass.js')

class SubContract extends Contract {

    constructor(){
        super('')
    }

}

let c = new SubContract();
console.log(c);
