/*
 * Function to send request to stripe API
 *
 */

// Dependencies
const https = require("https");
const url = require("url");
const util = require("util");
const debug = util.debuglog("order");
const config = require("./../../../config");

// Function to send request to stripe API to create a charge
const stripeRequest = function(amount, currency, source, callback){
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
};

// Exporting function
module.exports = stripeRequest;
