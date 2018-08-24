/*
 * File containing logic for put method
 *
 */

// Dependencies
const util = require("util");
const debug = util.debuglog("users");
const _data = require("./../../lib/data");
const _helpers = require("./../../lib/helpers");

// put function
const put = function(data, callback){
  const email = typeof(data.payload.email)=="string"&&data.payload.email.trim().length>0?data.payload.email.trim():false;
    // Checking validity of parameters
  if(email){
    // Getting user details
    _data.read(email, "users", function(err, userData){
      if(!err&&userData){
        // Parsing user data
        const userDataObject = _helpers.parse(userData);
        if(typeof(data.payload.address)=="string"&&data.payload.address.trim().length>0){
          userDataObject.address = data.payload.address;
        }
        if(typeof(data.payload.password)=="string"&&data.payload.password.trim().length>0){
          userDataObject.password = data.payload.password;
        }
        if(typeof(data.payload.name)=="string"&&data.payload.name.trim().length>0){
          userDataObject.name = data.payload.name;
        }
        // Writing updated object into file
        _data.update(email, "users", userDataObject, function(err){
          if(!err){
            callback(200);
          }else{
            debug("Error while updating file", err);
            callback(500, {"Error": "Unable to update user data"});
          }
        });
      }else{
        debug("Error while reading file", err);
        callback(403, {"Error": "User does not exist"});
      }
    });
  }else{
    callback(400, {"Error": "Required fields missing"});
  }
};

// Exporting module
module.exports = put;
