/*
 * Container file for token methods
 *
 */

// Dependencies
const get = require("./get");
const put = require("./put");
const post = require("./post");
const remove = require("./delete");

// Container object
const methods = {
  'get': get,
  'put': put,
  'post': post,
  'delete': remove
};

// Function to select appropriate method
const handler = function(data, callback){
  // Checking method type
  const selectedMethod = typeof(methods[data.method.trim().toLowerCase()])!="undefined"?methods[data.method.trim().toLowerCase()]:false;
  if(selectedMethod){
    selectedMethod(data, callback);
  }else{
    callback(405);
  }
};

// Exporting function
module.exports = handler;
