/*
 * Container file for routes
 *
 */

// Dependencies
const ping = require("./ping");
const notFound = require("./notFound");
const users = require("./users");

// Container object
const router = {
  'ping': ping,
  'users': users,
  'notFound': notFound
};

// Exporting module
module.exports = router;
