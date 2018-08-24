/*
 * File containing logic for get method
 *
 */

// Dependencies

// Get function
const get = function(data, callback){
  callback(200, {"message": "Inside get function"});
};

// Exporting  function
module.exports = get;
