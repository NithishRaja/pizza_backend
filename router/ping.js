/*
 * File containing route to monitor state of app
 *
 */

// Ping function
const ping = function(data, callback){
  callback(200, {"ping":"pong"});
};

// Exporting function
module.exports = ping;
