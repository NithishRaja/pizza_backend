/*
 * Container file for menu route
 *
 */

// Dependencies
const get = require("./get");
const post = require("./post");
const remove = require("./delete");

// Methods container
const methods = {
  'get': get,
  'post': post,
  'delete': remove
};

// Function to select appropriate method
const handler = function(data, callback){
  const selectedMethod = typeof(methods[data.method.trim().toLowerCase()])!="undefined"?methods[data.method.trim().toLowerCase()]:false;
  if(selectedMethod){
    selectedMethod(data, callback);
  }else{
    callback(405);
  }
};

// Exporting function
module.exports = handler;
