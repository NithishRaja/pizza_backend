/*
 * File containing worker functions
 *
 */

// Dependencies
const _data = require("./data");

// Declaring worker object
let worker = {};

// Function to delete expired tokens
worker.clean = function(){
  // Getting token list
  _data.list("tokens", function(err, fileNameArray){
    if(!err&&fileNameArray&&fileNameArray.length>0){
      // Looping through fileNameArray
      fileNameArray.forEach(function(fileName){
        // Getting token data
        _data.read(fileName, "tokens", function(err, tokenData){
          if(!err&&tokenData){
            // Checking if token has expired
            if(tokenData.timeOfExpiry<Date.now()){
              // delete token
              _data.delete(fileName, "tokens", function(err){
                if(err){
                  console.log("Error while deleting token", err);
                }
              });
            }
          }else{
            console.log("Error while reading token data", err);
          }
        });
      });
    }else{
      console.log("Error while getting tokens list", err);
    }
  });
};

// Function to call clean function every 24 hours
worker.loop = function(){
  setInterval(function(){
    worker.clean();
  },1000*60*60*24);
};

// Init function
worker.init = function(){
  // Calling function to check tokens
  worker.clean();
  // Calling loop function
  worker.loop();
};

// Exporting worker
module.exports = worker;
