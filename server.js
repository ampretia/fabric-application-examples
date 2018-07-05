// if you haven't provided a 'npm start' script that runs the startChaincode app
// then you can do so programmatically, but using the standard convetions by
// 
// require('fabric-shim').spi.startChaincode();



// Alternatively to use a different convention you can specifically add in the classes that export the functions
//
// const UpdateValues = require('./updatevalues')
// const RemoveValues = require('./removevalues')
// require('fabric-shim').spi.register( [UpdateValues,RemoveValues] );
