/*
 * File containing logic for put method
 *
 */

// Dependencies

// put function
const put = function(data, callback){
  callback(200, {"message": "inside put method"});
};

// Exporting module
module.exports = put;
