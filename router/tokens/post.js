/*
 * File containing logic for post method
 *
 */

// Dependencies
const util = require("util");
const debug = util.debuglog("tokens");
const _data = require("./../../lib/data");
const _helpers = require("./../../lib/helpers");

// post function
const post = function(data, callback){
  const email = typeof(data.payload.email)=="string"&&data.payload.email.trim().length>0?data.payload.email.trim():false;
  const password = typeof(data.payload.password)=="string"&&data.payload.password.trim().length>0?data.payload.password.trim():false;
  // Verifying payload
  if(email&&password){
    // Getting user data
    _data.read(email, "users", function(err, userData){
      if(!err&&userData){
        // Hashing password
        const hashPassword = _helpers.hash(password);
        // Checking if passwords match
        if(hashPassword===userData.password){
          // Getting token id
          const tokenId = _helpers.createRandomId(20);
          // Creating token object
          const tokenObject = {
            'id': tokenId,
            'email': email,
            'timeOfExpiry': Date.now()+1000*60*60
          };
          // Writing token object to file
          _data.create(tokenId, "tokens", tokenObject, function(err){
            if(!err){
              callback(200, tokenObject);
            }else{
              debug("Error occured while creating new token", err);
              callback(500, {"Error": "Unable to create new token"});
            }
          });
        }else{
          callback(403, {"Error": "Passsword does not match"});
        }
      }else{
        debug("Error occured while tryingto read file", err);
        callback(403, {"Error": "User does not exist"});
      }
    });
  }else{
    callback(400, {"Error": "Required fields missing"});
  }
};

// Exporting  function
module.exports = post;
