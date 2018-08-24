/*
 * Container file for all methods of users route
 *
 */

// Dependencies
const get = require("./get");
const put = require("./put");
const post = require("./post");
const remove = require("./delete");

// Creating container
const methods = {
  'get': get,
  'put': put,
  'post': post,
  'delete': remove
};

// Function to set the function according to method
const handler = function(data, callback){
  // Checking method type
  const selectedMethod = typeof(methods[data.method.trim().toLowerCase()])!="undefined"?methods[data.method.trim().toLowerCase()]:false;
  // Returning the status code and function
  if(selectedMethod){
    // Calling the handler
    selectedMethod(data, callback);
  }else{
    callback(405);
  }
};

// Exporting function
module.exports = handler;
