/*
 * FIle containing logicfor delete method
 *
 */

// Dependencies
const util = require("util");
const debug = util.debuglog("menu");
const _data = require("./../../lib/data");

// Delete function
const remove = function(data, callback){
  const email = typeof(data.query.email)=="string"&&data.query.email.trim().length>0?data.query.email.trim():false;
  const tokenId = typeof(data.headers.token)=="string"&&data.headers.token.trim().length==20?data.headers.token.trim():false;
  // Verifying parameters
  if(email&&tokenId){
    // Getting token data
    _data.read(tokenId, "tokens", function(err, tokenData){
      if(!err&&tokenData){
        // Checking if token expired and if token belongs to user
        if(tokenData.email===email&&tokenData.timeOfExpiry>Date.now()){
          // Deleting file
          _data.delete(email, "cart", function(err){
            if(!err){
              callback(200);
            }else{
              callback(500, {"Error": "Unable to delete file"});
            }
          });
        }else{
          callback(403, {"Error": "Token has expired"});
        }
      }else{
        debug("Error while getting token data", err);
        callback(403, {"Error": "Token does not exist"});
      }
    });
  }else{
    callback(400, {"Error": "Required parameters missing"});
  }
};

// Exporting module
module.exports = remove;
