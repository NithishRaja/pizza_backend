/*
 * File containing logic for delete method
 *
 */

// Dependencies
const util = require("util");
const debug = util.debuglog("tokens");
const _data = require("./../../../lib/data");

// delete function
const remove = function(data, callback){
  const tokenId = typeof(data.query.token)=="string"&&data.query.token.trim().length>0?data.query.token.trim():false;
  // Verifying query parameters
  if(tokenId){
    // Reading token
    _data.read(tokenId, "tokens", function(err, tokenData){
      if(!err&&tokenData){
        // deleting token
        _data.delete(tokenId, "tokens", function(err){
          if(!err){
            callback(200);
          }else{
            debug("Error deleting token", err);
            callback(500, {"Error": "Unable to delete token"});
          }
        });
      }else{
        debug("Error reading token data", err);
        callback(403, {"Error": "Unable to read token"});
      }
    });
  }else{
    callback(400, {"Error": "Required fields missing"});
  }
};

// Exporting  function
module.exports = remove;
