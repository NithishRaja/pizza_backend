/*
 * File containing server logic
 *
 */

// Dependencies
const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const util = require("util");
const debug = util.debuglog("server");
const config = require("./../config");
const _helpers = require("./helpers");
const router = require("./../router");

// Creating server container
let server = {};

// Creating HTTP server
server.httpServer = http.createServer(function(req, res){
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
    // Deciding which router to send request to
    const selectedRouter = typeof(router[trimmedUrl])!="undefined"?router[trimmedUrl]:router.notFound;
    // Calling selected router
    selectedRouter(data, function(statusCode, payload){
      // Checking status code
      statusCode = typeof(statusCode)=="number"?statusCode:200;
      // Checking payload
      payload = typeof(payload)=="object"?payload:{};
      // Converting payload into string
      const payloadString = JSON.stringify(payload);
      // Setting header
      res.setHeader("Content-Type", "application/json");
      // Setting status code
      res.writeHead(statusCode);
      // Sending payload
      res.end(payloadString);
      // Logging the response to console
      debug("url: "+data.trimmedUrl+" method: "+data.method+" statusCode: "+statusCode);
    });
  });
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
