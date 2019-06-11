/*
 * File containing logic for post method of order route
 *
 */

// Dependencies
const util = require("util");
const debug = util.debuglog("order");
const _data = require("./../../../../lib/data");
const stripeRequest = require("./stripeRequest");

// Post function
// NOTE: Payment via stripe is a two step process. Both client side and server side are involved. Here client sends a token which is used to send the API request
const post = function(data, callback){
  const tokenId = typeof(data.headers.token)=="string"&&data.headers.token.trim().length==20?data.headers.token.trim():false;
  const amount = typeof(data.payload.amount)=="number"?data.payload.amount:false;
  const currency = typeof(data.payload.currency)=="string"&&data.payload.currency.trim().length>0?data.payload.currency.trim():false;
  const source = typeof(data.payload.source)=="string"&&data.payload.source.trim().length>0?data.payload.source.trim():false;
  // const account = typeof(data.payload.account)=="string"&&data.payload.account.trim().length>0?data.payload.account.trim():false;
  // Checking if parameters are valid
  if(amount&&currency&&source&&tokenId){
    // Getting token data and checking if token has expired
    _data.read(tokenId, "tokens", function(err, tokenData){
      if(!err&&tokenData&&tokenData.timeOfExpiry>Date.now()){
        // Getting user email
        const email = tokenData.email;
        // Sending request to stripe
        stripeRequest(email, amount, currency, source, callback);
      }else{
        callback(403, {"Error": "Token has expired or token does not exist"});
      }
    });
  }else{
    callback(400, {"Error": "Required parameters missing"});
  }
};

// Exporting function
module.exports = post;
