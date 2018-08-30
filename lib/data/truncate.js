/*
 * File containing function to truncate files
 *
 */

// Dependencies
const fs = require("fs");
const config = require("./../../config");

// Truncate function
const truncate = function(fileName, fileDir, callback){
  fs.truncate(config.dataDir+"/"+fileDir+"/"+fileName+".json", function(err){
    if(!err){
      callback(false);
    }else{
      callback({"Error": "Unable to truncate file"});
    }
  });
};

// Exporting module
module.exports = truncate;
