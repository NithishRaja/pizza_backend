/*
 * Container file for CRUD operations to file
 *
 */

// Dependencies
const read = require("./read");
const update = require("./update");
const create = require("./create");
const remove = require("./delete");
const list = require("./list");

// Initializing container
const data = {
  'read': read,
  'update': update,
  'create': create,
  'delete': remove,
  'list': list
};

// Exporting module
module.exports = data;
