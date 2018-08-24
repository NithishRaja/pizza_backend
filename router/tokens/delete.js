/*
 * File containing logic for delete method
 *
 */

// Dependencies

// delete function
const remove = function(data, callback){
  callback(200, {"message": "Inside delete function"});
};

// Exporting  function
module.exports = remove;
