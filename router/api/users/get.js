/*
 * File containing logic for get method
 *
 */

// Dependencies
const util = require("util");
const debug = util.debuglog("users");
const _data = require("./../../../lib/data");

// Get function
const get = function(data, callback){
  const tokenId = typeof(data.headers.token)=="string"&&data.headers.token.trim().length==20?data.headers.token.trim():false;
  const userEmail = typeof(data.query.email)=="string"&&data.query.email.trim().length>0?data.query.email.trim():false;
  // Checking query parameter validity
  if(userEmail&&tokenId){
    // Getting token data
    _data.read(tokenId, "tokens", function(err, tokenData){
      if(!err&&tokenData){
        // Checking if token belongs to user and if token has not expired
        if(tokenData.email===userEmail&&tokenData.timeOfExpiry>Date.now()){
          // Reading from file
          _data.read(userEmail, "users", function(err, userData){
            if(!err&&userData){
              delete userData.password;
              callback(200, userData);
            }else{
              debug("Error while reading file", err);
              callback(403, {"Error": "User doen not exist"});
            }
          });
        }else{
          callback(403, {"Error": "Token does not belong to user or token has expired"});
        }
      }else{
        debug("Error unable to read token", err);
        callback(403, {"Error": "Invalid token"});
      }
    });
  }else{
    callback(400, {"Error": "Required fiels missing"});
  }
};

// Exporting module
module.exports = get;
