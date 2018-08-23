/*
 * File containing server logic
 *
 */

// Dependencies
const http = require("http");

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
  server.httpServer.listen(3000, function(){
    console.log("Server is running on port 3000, press Ctrl+C to exit");
  });
};

// Exporting module
module.exports = server;
