/*
 * Container file for reading files containing menu
 *
 */

// Dependencies
const read = require("./read");
const list = require("./list");

// Container object
const container = {
  'read': read,
  'list': list
};

// Exporting container
module.exports = container;
