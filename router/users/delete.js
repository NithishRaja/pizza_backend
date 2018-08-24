/*
 * File containing logic for delete method
 *
 */

// Dependencies

// delete function
const remove = function(data, callback){
  callback(200, {"message": "inside delete method"});
};

// Exporting module
module.exports = remove;
