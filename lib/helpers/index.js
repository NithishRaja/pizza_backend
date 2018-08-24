/*
 * Container file for helper functions
 *
 */

// Dependencies
const parse = require("./parse");
const hash = require("./hash");

// Initializing container
const helpers = {
  'parse': parse,
  'hash': hash
};

// Exporting container
module.exports= helpers;
