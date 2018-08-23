/*
 * File containing server logic
 *
 */

// Dependencies
const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const config = require("./../config");
const _helpers = require("./helpers");
const _data = require("./data");

// Creating server container
let server = {};

// Creating HTTP server
server.httpServer = http.createServer(function(req, res){
  // TODO: remove code after testing
  _data.read("nithish", "users", function(err, userData){
    if(!err&&userData){
      console.log(userData);
    }else{
      console.log(err.Error);
    }
  });
  // parsing url
  let parsedUrl = url.parse(req.url, true);
  // getting trimmed url
  let trimmedUrl = parsedUrl.pathname.replace(/^\/+|\/+$/g,'');
  // getting request method
  let method = req.method;
  // getting query object
  let query = parsedUrl.query;
  // getting headers
  let headers = req.headers;
  // getting req body
  let decoder = new StringDecoder("utf-8");
  let buffer="";
  // listening to data stream
  req.on("data", function(data){
    buffer+=decoder.write(data);
  });
  // listening to end of data stream
  req.on("end", function(){
    buffer+=decoder.end();
    // Initializing data object
    const data = {
      'trimmedUrl': trimmedUrl,
      'method': method,
      'query': query,
      'headers': headers,
      'payload': _helpers.parse(buffer)
    };
  });
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
