/*
 * Container file for api route handlers
 *
 */

// Dependencies
const users = require("./users");
const tokens = require("./tokens");
const menu = require("./menu");
const cart = require("./cart");
const order = require("./order");

// Initializing container
handlers = {
  'users': users,
  'tokens': tokens,
  'menu': menu,
  'cart': cart,
  'order': order,
};

// Initializing api function
const api = function(data, callback){
  trimmedUrl = typeof(data.trimmedUrl) == "string" && data.trimmedUrl.length > 0 ? data.trimmedUrl : false;
   // Checking trimmedUrl
   if(trimmedUrl){
     // Removing `/api` part from requested url
     endpoint = trimmedUrl.replace("api/", "").trim();
     // Checking if requested handler exist
     if(handlers.hasOwnProperty(endpoint)){
       // Calling handler to handle oncoming request
       handlers[endpoint](data, callback);
     }else{
       // requested handler does not exist
       callback(404, {"Error": "The api route "+endpoint+" does not exist"});
     }
   }
};

// Exporting function
module.exports = api;
