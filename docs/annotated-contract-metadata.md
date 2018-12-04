
# Annotated Contract Metadata

The Contract Metadata can be supplied either by the Contract developer or it can be inferred from the source code. Depending the source language used, and the amount of annotations (if permitted by the language) you may need to augment the metadata that is generated. 

Below is a annotated copy of a full example metadata showing how it can be used. 

## Metadata Schema

The metadata itself is in JSON, and there is a JSON-Schema definition that defines the contents; this meta data is available online at http://fabric-shim.github.io/contract-schema.json 
This is the latest ga copy of the schema. Specific version can be obtained using urls http://fabric-shim.github.io/<release>/contract-schema.json where releases matches the release name, for example
`master` `release-1.4` etc. (note metadata was first introduced at v1.4)

A lot of the elements of this metadata borrow heavily from the [OpenAPI v3.0 specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md) and [JSON Schema](http://json-schema.org/)

## Example

The metadata consist of three top level objects, 'info' 'contracts' and 'components'

### Info

*Purpose:*

To represent information about all the contracts defined in this chaincode module.

*Full Example:* 
```json
  "info": {
    "title": "Commercial Paper Smart Contract",
    "description": "Smart Contract definitions for Commercial Paper, issuing and trading",
    "termsOfService": "http://example.com/terms/",
    "contact": {
      "name": "Peso Phillips",
      "url": "http://www.example.com/support",
      "email": "peso.phillips@example.com"
    },
    "license": {
      "name": "Apache 2.0",
      "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
    },
    "version": "1.0.1"
  }
```

*Minimal Example:*
```json
  "info": {
    "title": "Commercial Paper Smart Contract",
    "version": "1.0.1"
  }
```

*Structure:*

This has exactly the same elements, and requirements as OpenAPI's [info object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#infoObject).  


### Contracts

*Purpose:*

This represents each contract class; with the contracts object there 'contract' objects that represent each class. 

So for example the contracts object could be 

```json
"contracts": {
    "initUpgrade": {
        ...
    },
    "purchasing":{ 
        ...
    },
    "query": {
        ...
    }
}

### Contract Object

*Purpose:* 

Individual Contract object

*Structure:*
 
Each contract object has the following structure

```json
"CommercialPaper":{
    "name": "CommercialPaper",
    "info": {
        ...
    },
    "transactions":[
        ...
    ]
}
```

The name is the name of the contract, and is also the key value of the object. 'info' is the same OpenAPI info object as used at the top level of the metadata. It is not expected that the full form of this will be used with individual contracts.

Each 'transaction' represents the transaction functions within the contract (and will map, therefore, to a specific function in the code).

A starting example is a very simple transaction function.

```json
        "transactions": [
          {
            "name": "setGreetingText",
            "tag": [
              "submitTx"
            ],
            "parameters": [
              {
                "name": "text",
                "description": "",
                "schema": {
                  "type": "string"
                }
              },
              {
                "name": "value",
                "schema": {
                  "$ref": "#/components/schemas/Greeting"            
                }
              }
            ]

          }
        ]
```

- the name of the function is 'setGreetingText'
- it has a tag of 'submitTx' that means that this transaction is intended to be submitted with the 'submitTransaction' sdk function. The implication is that this is then submitted to the orderder.  If this is not present, then the function will be 'evaluated', not submitted to the order so in effect a query-style operation.
- the parameters of the function are defined in 'parameters' as an error of parameter definitions. (each of which follows the [parameterObject](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#parameterObject) of OpenAPI)
- typically a parameter will contain a 'name', optional 'description' and critically the 'schema' 
- again 'schema' comes from OpenAPI [schemaObject](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#schemaObject)
- In this example, there are two parameters one is a simple string, and the schema uses type to refer to this simply

```json
    "schema": {
        "type": "string"
    }
```

Where as the second uses the concept of references to permit a more complex object definition.

### Components

This section defines the more complex components that can occur in functions. This is typicaly used to represent objects or similar in the contract. They are generated for example from the `@object` annotation.

In the above example, the schema is defined as 
```json
    "schema": {
        "$ref": "#/components/schemas/Greeting"            
    }
```

The `#/components/schemas/Greeting` is a JSON pointer to the following element:
```json

    "components": {
      "schemas": {
        "Greeting": {
          "$id": "Greeting",
          "type": "object",
          "additionalProperties": false,
          "properties": [
            {
              "name": "text",
              "schema": {
                "type": "string"
              }
            }
          ]
        }
      }
    }

```

The `schemas` section is an object listing the schemas (the key and $id element match).
Each of these has the specifiction from the OpenAPI [schemaObject](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#schemaObject)

At runtime, any object that is supplied as one of the paratemers matching a defined schema (in this case the Greeting object), has to match this supplied schema. The 'serializer' within the contract-api will produce a JSON representation of the object that is validated against this schema. 

In this case for example, only the field 'text' is permitted - as additionalProperties is false. And has to be a string. 

An other example would be to have a numeric value and limit its range. 

```json
    "age": {
      "type": "integer",
      "format": "int32",
      "minimum": 0
    }
```

Individual elements of an object can refer to other objects for example, and the overall object can defined required fields. 

This example is defining the concept of a person; who has a name, address and an age. 

- The name is mandatory and has to exist, 
- additional properties not listed here will be accepted.
- The address is defined elsewhere, and the age has to be at leat 0

```json
"person" : {
  "$id":"person",  
  "type": "object",
  "required": [
    "name"
  ],
  "properties": {
    "name": {
      "type": "string"
    },
    "address": {
      "$ref": "#/components/schemas/Address"
    },
    "age": {
      "type": "integer",
      "format": "int32",
      "minimum": 0
    }
  }
}
```