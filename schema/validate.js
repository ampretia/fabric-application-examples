'use strict';

const Ajv = require('ajv')
const cntrtData = require('./example-full.json');
const jsome = require('jsome')

let schemaList = []
for (let name in cntrtData.components.schemas){
    let s = cntrtData.components.schemas[name]
    let props = {}
    s.properties.forEach((e)=>{
        props[e.name]=e;
    })


    s.properties = props;
    schemaList.push(s);
};

schemaList.push({
    "type": "string"
  })

var ajv = new Ajv({ useDefaults: true, 
                    coerceTypes: false, 
                    allErrors: true,
                    schemas:schemaList,
                 });
// ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));


let sv = ajv.compile({
    "type": "string"
  });
let valid = sv("gello")
console.log(valid);
// var data = { "first": "peso" , "lastName":"penguin","age":"10"};
// let ownerValidator = ajv.getSchema('owner')



// let valid = ownerValidator(data);
// if (!valid){
//     console.log('\nNot Valid')
//     console.log(jsome.getColoredString(ownerValidator.errors));
// }


// let valid2 = ownerValidator({ "firstName": "peso" , "lastName":"penguin","age":"10"});
// if (!valid2){
//     console.log('\nNot Valid')
//     console.log(ownerValidator.errors);
// } else {
//     console.log('\nValid')
// }


// let paperValidator = ajv.getSchema('paper')
// let paper = { "firstName": "peso" , "lastName":"penguin","age":"10"};
// let valid2 = paperValidator(paper);
// if (!valid2){
//     console.log('\nNot Valid')
//     console.log(jsome.getColoredString(paperValidator.errors));
// } else {
//     console.log('\nValid')
// }

// let stringValidator = ajv.getSchema('string');
// let valid3 = stringValidator(false);
// if (!valid3){
//     console.log('\nNot Valid')
//     console.log(jsome.getColoredString(stringValidator.errors));
// } else {
//     console.log('\nValid')
// }

