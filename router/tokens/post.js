/*
 * File containing logic for post method
 *
 */

// Dependencies

// post function
const post = function(data, callback){
  callback(200, {"message": "Inside post function"});
};

// Exporting  function
module.exports = post;
