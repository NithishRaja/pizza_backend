/*
 * File containing logic for post method of order route
 *
 */

// Dependencies
const https = require("https");
const url = require("url");
const util = require("util");
const debug = util.debuglog("order");
const config = require("./../../config");
const _data = require("./../../lib/data");
const _cart = require("./../../lib/cart");

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
        // Sending request to stripe
        // Parsing url
        const parsedUrl = url.parse(config.stripeUrl);
        // Setting request details
        const requestDetails = {
          'protocol': parsedUrl.protocol,
          'method': 'POST',
          'hostname': parsedUrl.hostname,
          'path': parsedUrl.path,
          'timeout': 5*1000
        };
        // Initializing request
        const req = https.request(requestDetails, function(res){
          if(res.statusCode==200){
            callback(res.statusCode, {"Message": "Payment successful"});
            // TODO: Empty cart
            // TODO: Send mail to user via mailgun API
          }else if(res.statusCode>=400){
            callback(res.statusCode, {"Message": "Payment failed"});
          }
        });
        // Setting headers
        req.setHeader("Content-Type", "application/x-www-form-urlencoded");
        req.setHeader("Authorization", "Bearer "+config.stripeAPIKey);
        // Preparing payload
        const payloadString="amount="+amount+"&&currency="+currency+"&&source="+source;
        // Listening to error
        req.on("error", function(err){
          debug("Error while sending request to stripe", err);
          callback(500, {"Error": "Failed to complete transaction"});
        });
        // Listening to timeout
        req.on("timeout", function(err){
          debug("Request to stripe timedout", err);
          callback(500, {"Error": "Transaction request timed out"});
        });
        // Settind payload
        req.write(payloadString, function(){
          // Sending request
          req.end();
        });
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
