/*
 * Container file for routes
 *
 */

// Dependencies
const ping = require("./ping");
const notFound = require("./notFound");
const api = require("./api");

// Container object
const router = {
  'ping': ping,
  'api': api,
  'notFound': notFound
};

// Exporting module
module.exports = router;
