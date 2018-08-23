/*
 * File containing server logic
 *
 */

// Dependencies
const http = require("http");
const config = require("./../config");

// Creating server container
let server = {};

// Creating HTTP server
server.httpServer = http.createServer(function(req, res){
  res.writeHead(200);
  res.end("pong");
});

// Init function to start server
server.init = function(){
  // listening to specified port
  server.httpServer.listen(config.port, function(){
    console.log("Server is running on port "+config.port+", press Ctrl+C to exit");
  });
};

// Exporting module
module.exports = server;
