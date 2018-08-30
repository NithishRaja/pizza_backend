/*
 * FIle containing logic to add menu items to cart
 *
 */

// Dependencies
const util = require("util");
const debug  = util.debuglog("menu");
const _data  = require("./../../lib/data");
const _menu = require("./../../lib/menu");

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
      // Checking if token and email match and if token has expired
      if(tokenData.email===email&&tokenData.timeOfExpiry>Date.now()){
        _menu.list(function(err, menuList){
          if(!err&&menuList){
            // Checking if item is on menu
            if(menuList.indexOf(item)>-1){
              // Initializing orderObject
              const orderObject = {
                'item': item,
                'noOfItem': noOfItem
              };
              // Converting orderObject to string
              const orderString = JSON.stringify(orderObject);
              // Append to cart
              _data.append(email, "cart", orderString+"\n", function(err){
                if(!err){
                  callback(200);
                }else{
                  debug("Error while appending to file", err);
                  callback(500, {"Error": "Unable to append to file"});
                }
              });
            }else{
              callback(403, {"Error": "Item does not exist on menu"});
            }
          }else{
            debug("Error while retrieving menu items list", err);
            callback(500, {"Error": "Unable to get menu items"});
          }
        });
      }else{
        callback(403, {"Error": "Token does not match email"});
      }
    });
  }else{
    callback(400, {"Error": "Required parameters missing"});
  }
};

// Exporting function
module.exports = post;
