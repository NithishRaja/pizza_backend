/*
 * FIle containing logic to add menu items to cart
 *
 */

// Dependencies
const util = require("util");
const debug  = util.debuglog("menu");
const _data  = require("./../../lib/data");

// Post function
const post = function(data, callback){
  const tokenId = typeof(data.headers.token)=="string"&&data.headers.token.trim().length==20?data.headers.token.trim():false;
  const email = typeof(data.payload.email)=="string"&&data.payload.email.trim().length>0?data.payload.email.trim():false;
  const item = typeof(data.payload.item)=="string"&&data.payload.item.trim().length>0?data.payload.item.trim():false;
  const noOfItem = typeof(data.payload.noOfItem)=="number"&&data.payload.noOfItem>0?data.payload.noOfItem:false;
  // Verifying headers and payload
  if(tokenId&&email&&item&&noOfItem){
    // Getting token data
    _data.read(tokenId, "tokens", function(err, tokenData){
      // Checking if token and email match
      if(tokenData.email===email){
        // TODO: update cart with item id and noOfItem
        callback(200, {"message": "OK"});
      }else{
        callback(403, {"Error": "TOken does not match email"});
      }
    });
  }else{
    callback(400, {"Error": "Required parameters missing"});
  }
};

// Exporting function
module.exports = post;
