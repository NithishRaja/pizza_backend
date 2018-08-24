/*
 * File containing logic for get method
 *
 */

// Dependencies

// Get function
const get = function(data, callback){
  callback(200, {"message": "inside get method"});
};

// Exporting module
module.exports = get;
