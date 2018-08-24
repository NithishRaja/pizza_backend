/*
 * File containing logic for delete method
 *
 */

// Dependencies
const _data = require("./../../lib/data");

// delete function
const remove = function(data, callback){
  const userEmail = typeof(data.query.email)=="string"&&data.query.email.trim().length>0?data.query.email.trim():false;
  // validating query parameter
  if(userEmail){
    // Getting user data
    _data.read(userEmail, "users", function(err, userData){
      if(!err&&userData){
        // Deleting user
        _data.delete(userEmail, "users", function(err){
          if(!err){
            callback(200);
          }else{
            callback(500, {"Error": "Unable to delete user file"});
          }
        });
      }else{
        callback(403, {"Error": "User does not exist"});
      }
    });
  }else{
    callback(400, {"Error": "Required fields missing"});
  }
};

// Exporting module
module.exports = remove;
