/*
 * Primary file
 *
 */

// Dependencies
const server = require("./lib/server");

// Creating container
let app = {};

// Initializing init function
app.init = function(){
  // Starting up server
  server.init();
};

// Calling init function
app.init();

// Exporting module
module.exports = app;
