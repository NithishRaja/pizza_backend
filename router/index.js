/*
 * Container file for routes
 *
 */

// Dependencies
const ping = require("./ping");
const notFound = require("./notFound");

// Container object
const router = {
  'ping': ping,
  'notFound': notFound
};

// Exporting module
module.exports = router;
