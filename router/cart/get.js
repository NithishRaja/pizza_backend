/*
 * File containing logic for GET method
 *
 */

// Dependencies
const util = require("util");
const debug = util.debuglog("cart");
const _data = require("./../../lib/data");
const _cart = require("./../../lib/cart");

// Get function
const get = function(data, callback){
  const email = typeof(data.query.email)=="string"&&data.query.email.trim().length>0?data.query.email.trim():false;
  const tokenId = typeof(data.headers.token)=="string"&&data.headers.token.trim().length==20?data.headers.token.trim():false;
  // Verifying parameters
  if(email&&tokenId){
    // Getting token data
    _data.read(tokenId, "tokens", function(err, tokenData){
      if(!err&&tokenData){
        // Checking if token belongs to user and if token has expired
        if(tokenData.email===email&&tokenData.timeOfExpiry>Date.now()){
          // Getting cart details
          _cart.read(email, function(err, cartData){
            if(!err){
              console.log(cartData);
              // Checking if cart is empty
              if(cartData){
                callback(200, cartData);
              }else{
                callback(200, {});
              }
            }else{
              debug("Error getting cart details", err);
              callback(500, {"Error": "Unable to get cart details"});
            }
          });
        }else{
          callback(403, {"Error": "Token has expired"});
        }
      }else{
        debug("Error reading token", err);
        callback(403, {"Error": "Token does not exist"});
      }
    });
  }else{
    callback(400, {"Error": "Required parameters missing"});
  }
};

// Exporting function
module.exports = get;
