/*
 * Container file for CRUD operations to file
 *
 */

// Dependencies
const read = require("./read");
const update = require("./update");
const create = require("./create");
const remove = require("./delete");

// Initializing container
const data = {
  'read': read,
  'update': update,
  'create': create,
  'delete': remove
};

// Exporting module
module.exports = data;
