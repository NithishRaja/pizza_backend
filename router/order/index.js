/*
 * Container file for methods of order path
 *
 */

// Dependencies
const post = require("./post");

// Initializing container
const methods = {
  'post': post
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

// Exporting handler
module.exports = handler;
