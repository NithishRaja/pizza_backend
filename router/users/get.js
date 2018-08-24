/*
 * File containing logic for get method
 *
 */

// Dependencies
const _data = require("./../../lib/data");
const _helpers = require("./../../lib/helpers");

// Get function
const get = function(data, callback){
  const userEmail = typeof(data.query.email)=="string"&&data.query.email.trim().length>0?data.query.email.trim():false;
  // Checking query parameter validity
  if(userEmail){
    // Reading from file
    _data.read(userEmail, "users", function(err, userData){
      if(!err&&userData){
        const userDataObject = _helpers.parse(userData);
        callback(200, userDataObject);
      }else{
        callback(403, {"Error": "User doen not exist"});
      }
    });
  }else{
    callback(400, {"Error": "Required fiels missing"});
  }
};

// Exporting module
module.exports = get;
