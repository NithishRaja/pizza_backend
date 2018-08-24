/*
 * Container file for helper functions
 *
 */

// Dependencies
const parse = require("./parse");
const hash = require("./hash");
const createRandomId = require("./createRandomId");

// Initializing container
const helpers = {
  'parse': parse,
  'hash': hash,
  'createRandomId': createRandomId
};

// Exporting container
module.exports= helpers;
