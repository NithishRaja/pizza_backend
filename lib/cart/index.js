/*
 * Container file for file interaction functions
 *
 */

// Dependencies
const append = require("./append");
const remove = require("./delete");
const read = require("./read");

// Initializing container
const cart = {
  'read': read,
  'delete': remove,
  'append': append
};

// Exporting container
module.exports = cart;
