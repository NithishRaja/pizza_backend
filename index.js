/*
 * Primary file
 *
 */

// Dependencies
const server = require("./lib/server");
const worker = require("./lib/worker");

// Creating container
let app = {};

// Initializing init function
app.init = function(){
  // Starting up server
  server.init();
  // Starting up worker
  worker.init();
};

// Calling init function
app.init();

// Exporting module
module.exports = app;
