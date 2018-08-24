/*
 * File containing hash function
 *
 */

// Dependencies
const crypto = require("crypto");
const config = require("./../../config");

// Hash function
const hash = function(data){
  // Creating hmac
  const hmac = crypto.createHmac("sha256", config.hashSecret);
  // Updating hmac
  hmac.update(data);
  // returning hash string
  return hmac.digest("hex");
};

// Exporting module
module.exports = hash;
