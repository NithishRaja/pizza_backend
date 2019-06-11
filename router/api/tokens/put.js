/*
 * File containing logic for put method
 *
 */

// Dependencies
const util = require("util");
const debug = util.debuglog("tokens");
const _data = require("./../../../lib/data");

// put function
const put = function(data, callback){
  const tokenId = typeof(data.payload.token)=="string"&&data.payload.token.trim().length>0?data.payload.token.trim():false;
  const extend = typeof(data.payload.extend)=="boolean"&&data.payload.extend?true:false;
  // Verifying payload
  if(tokenId&&extend){
    // Reading token data
    _data.read(tokenId, "tokens", function(err, tokenData){
      if(!err&&tokenData){
        // Incrementing timeOfExpiry by 1 hour
        tokenData.timeOfExpiry = Date.now()+1000*60*60;
        // Writing to file
        _data.update(tokenId, "tokens", tokenData, function(err){
          if(!err){
            callback(200);
          }else{
            debug("Error while writing token file", err);
            callback(500, {"Error": "Unable to update token"});
          }
        });
      }else{
        debug("Error reading token file", err);
        callback(403, {"Error": "Unable to read token. Token may not exist"});
      }
    });
  }else{
    callback(400, {"Error": "Missing required fields"});
  }
};

// Exporting  function
module.exports = put;
