/*
 * File containing logic for post method
 *
 */

// Dependencies
const util = require("util");
const debug = util.debuglog("users");
const _data = require("./../../../lib/data");
const _helpers = require("./../../../lib/helpers");

// post function
const post = function(data, callback){
  const name = typeof(data.payload.name)=="string"&&data.payload.name.trim().length>0?data.payload.name.trim():false;
  const email = typeof(data.payload.email)=="string"&&data.payload.email.trim().length>0?data.payload.email.trim():false;
  const address = typeof(data.payload.address)=="string"&&data.payload.address.trim().length>0?data.payload.address.trim():false;
  const password = typeof(data.payload.password)=="string"&&data.payload.password.trim().length>0?data.payload.password.trim():false;
  // Checking payload content
  if(name&&email&&address&&password){
    // Checking if user exists
    _data.read(email, "users", function(err, userData){
      if(!err&&userData){
        callback(403, {"Error": "User with this email already exists"});
      }else{
        // Hashing password
        const hashPassword = _helpers.hash(password);
        // Creating new user
        const userObject = {
          'name': name,
          'email': email,
          'address': address,
          'password': hashPassword
        };
        // Converting object to string
        const userObjectString = JSON.stringify(userObject);
        // Writing to file
        _data.create(email, "users", userObject, function(err){
          if(!err){
            callback(200);
          }else{
            debug("Error while writing file", err);
            callback(500, {"Error": "Unable to create file"});
          }
        });
      }
    });
  }else{
    callback(400, {"Error": "Required fields missing"});
  }
};

// Exporting module
module.exports = post;
