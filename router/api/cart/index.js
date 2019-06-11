/*
 * COntainer file for cart methods
 *
 */

// Dependencies
const post = require("./post");
const remove = require("./delete");
const get = require("./get");

// Container object
const methods = {
  'post': post,
  'delete': remove,
  'get': get
};

// Function to select appropriate method
const handler = function(data, callback){
  const selectedMethod = typeof(methods[data.method.trim().toLowerCase()])!="undefined"?methods[data.method.trim().toLowerCase()]:false;
  // Checking if requested method exists
  if(selectedMethod){
    selectedMethod(data, callback);
  }else{
    callback(405);
  }
};

// Exporting function
module.exports = handler;
