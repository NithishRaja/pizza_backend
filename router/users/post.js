/*
 * File containing logic for post method
 *
 */

// Dependencies

// post function
const post = function(data, callback){
  callback(200, {"message": "inside post method"});
};

// Exporting module
module.exports = post;
