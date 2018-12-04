module.exports = class Contract {

    constructor(id){
        if( typeof id === 'undefined' || id === null ){
            this.name = this.constructor.name;
        } else {
            this.name = id.trim();
        }
        // console.log(this.prototype.getClassName());
    }

}