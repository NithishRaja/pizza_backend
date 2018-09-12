/*
 * File containing logic for get method
 *
 */

// Dependencies
const util = require("util");
const debug = util.debuglog("menu");
const _menu = require("./../../lib/menu");
const _data = require("./../../lib/data");

// Get method
const get = function(data, callback){
  const tokenId = typeof(data.headers.token)=="string"&&data.headers.token.trim().length==20?data.headers.token.trim():false;
  // Validating token
  if(tokenId){
    // Getting token data
    _data.read(tokenId, "tokens", function(err, tokenData){
      if(!err&&tokenData){
        // Checking if token has expired
        if(tokenData.timeOfExpiry>Date.now()){
          // Checking if menu category exists
          _menu.list(function(err, menuList){
            if(!err&&menuList){
              callback(200, menuList);
            }else{
              debug("Error getting menu categories", err);
              callback(500, {"Error": "Unable to get menu"});
            }
          });
        }else{
          callback(403, {"Error": "Token has expired"});
        }
      }else{
        debug("Error while reading token data", err);
        callback(403, {"Error": "Token does not exist"});
      }
    });
  }else{
    callback(400, {"Error": "Required fields missing"});
  }
};

// Exporting module
module.exports = get;
