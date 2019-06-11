/*
 * File containing logic for get method
 *
 */

// Dependencies
const util = require("util");
const debug = util.debuglog("tokens");
const _data = require("./../../../lib/data");

// Get function
const get = function(data, callback){
  const tokenId = typeof(data.query.token)=="string"&&data.query.token.trim().length>0?data.query.token.trim():false;
  // Validating query parameters
  if(tokenId){
    // Getting token data
    _data.read(tokenId, "tokens", function(err, tokenData){
      if(!err){
        callback(200, tokenData);
      }else{
        debug("Error reading token file", err);
        callback(403, {"Error": "Token does not exist"});
      }
    });
  }else{
    callback(400, {"Error": "Required fields missing"});
  }
};

// Exporting  function
module.exports = get;
