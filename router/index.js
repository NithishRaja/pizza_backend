/*
 * Container file for routes
 *
 */

// Dependencies
const ping = require("./ping");
const notFound = require("./notFound");
const users = require("./users");
const tokens = require("./tokens");

// Container object
const router = {
  'ping': ping,
  'users': users,
  'tokens': tokens,
  'notFound': notFound
};

// Exporting module
module.exports = router;
