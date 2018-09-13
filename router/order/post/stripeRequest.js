/*
 * Function to send request to stripe API
 *
 */

// Dependencies
const https = require("https");
const url = require("url");
const util = require("util");
const querystring = require("querystring");
const StringDecoder = require("string_decoder").StringDecoder;
const debug = util.debuglog("order");
const config = require("./../../../config");
const sendMail = require("./sendMail");

// Function to send request to stripe API to create a charge
const stripeRequest = function(email, amount, currency, source, callback){
  // Parsing url
  const parsedUrl = url.parse(config.stripeUrl);
  // Preparing query
  const query={
    'amount':amount,
    'currency':currency,
    'source':source
  };
  const queryString = querystring.stringify(query);
  // Setting request details
  const requestDetails = {
    'protocol': parsedUrl.protocol,
    'method': 'POST',
    'hostname': parsedUrl.hostname,
    'path': parsedUrl.path+"?"+queryString,
    'timeout': 5*1000
  };
  // Initializing request
  const req = https.request(requestDetails, function(res){
    let decoder = new StringDecoder("utf-8");
    let buffer="";
    // Listening to data
    res.on("data", function(data){
      buffer+=decoder.write(data);
    });
    // Logging data onto console
    res.on("end", function(){
      buffer+=decoder.end();
      console.log("Response payload from stripe: ",buffer);
    });
    // Logging response code to console
    console.log("Response status code from stripe: ",res.statusCode);
    // Checking status code and responding accordingly
    if(res.statusCode==200){
      callback(res.statusCode, {"Message": "Payment successful"});
      sendMail(email, amount, currency);
      // TODO: Empty cart
    }else if(res.statusCode>=400){
      callback(res.statusCode, {"Message": "Payment failed"});
    }
  });
  // Setting headers
  // req.setHeader("Content-Type", "application/x-www-form-urlencoded");
  req.setHeader("Authorization", "Bearer "+config.stripeAPIKey);
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
  // Sending request
  req.end();
};

// Exporting function
module.exports = stripeRequest;
