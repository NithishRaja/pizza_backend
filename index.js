/*
 * Primary file
 *
 */

// Dependencies
const http = require("http");

// Creating server
const server = http.createServer(function(req, res){
  res.writeHead(200);
  res.end("pong");
});

// listening to port 3000
server.listen(3000, function(){
  console.log("Server is running on port 3000, press Ctrl+C to exit");
});
