/*
 * File containing logic for delete method
 *
 */

// Dependencies
const util = require("util");
const debug = util.debuglog("users");
const _data = require("./../../lib/data");

// delete function
const remove = function(data, callback){
  const tokenId = typeof(data.headers.token)=="string"&&data.headers.token.trim().length==20?data.headers.token.trim():false;
  const userEmail = typeof(data.query.email)=="string"&&data.query.email.trim().length>0?data.query.email.trim():false;
  // validating query parameter
  if(userEmail&&tokenId){
    // Getting token data
    _data.read(tokenId, "tokens", function(err, tokenData){
      if(!err&&tokenData){
        // Checking if token belongs to user and token has not expired
        if(tokenData.email===userEmail&&tokenData.timeOfExpiry>Date.now()){
          // Getting user data
          _data.read(userEmail, "users", function(err, userData){
            if(!err&&userData){
              // Deleting user
              _data.delete(userEmail, "users", function(err){
                if(!err){
                  callback(200);
                }else{
                  debug("Error while deleting file", err);
                  callback(500, {"Error": "Unable to delete user file"});
                }
              });
            }else{
              debug("Error while reading file", err);
              callback(403, {"Error": "User does not exist"});
            }
          });
        }else{
          callback(403, {"Error": "Token does not belong to user or token has expired"});
        }
      }else{
        debug("Error reading token data", err);
        callback(403, {"Error": "Token does not exist or token has expired"});
      }
    });
  }else{
    callback(400, {"Error": "Required fields missing"});
  }
};

// Exporting module
module.exports = remove;
