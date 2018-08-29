/*
 * File containing logic for get method
 *
 */

// Dependencies
const util = require("util");
const debug = util.debuglog("menu");
const _menu = require("./../../lib/menu");
const _data = require("./../../lib/data");
const _helpers = require("./../../lib/helpers");

// Get method
const get = function(data, callback){
  const tokenId = typeof(data.headers.token)=="string"&&data.headers.token.trim().length==20?data.headers.token.trim():false;
  const menuCategory = typeof(data.query.menu)=="string"&&data.query.menu.trim().length>0?data.query.menu.trim():"full";
  // Validating token
  if(tokenId){
    // Getting token data
    _data.read(tokenId, "tokens", function(err, tokenData){
      if(!err&&tokenData){
        // Parsing token data
        const tokenDataObject = _helpers.parse(tokenData);
        // Checking if token has expired
        if(tokenDataObject.timeOfExpiry>Date.now()){
          // Checking if menu category exists
          _menu.list(function(err, menuCategoryList){
            if(!err&&menuCategoryList&&menuCategoryList.indexOf(menuCategory)>-1){
              // Getting menu
              _menu.read(menuCategory, function(err, menuData){
                if(!err){
                  // Parsing menu data
                  const menuDataObject = _helpers.parse(menuData);
                  callback(200, menuDataObject);
                }else{
                  debug("Error reading menu", err);
                  callback(500, {"Error": "Unable to get menu"});
                }
              });
            }else{
              debug("Error getting menu categories", err);
              callback(403, {"Error": "Menu category may not exist"});
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
