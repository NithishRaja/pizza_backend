/*
 * File containing logic to append to file
 *
 */

// Dependencies
const fs = require("fs");
const config = require("./../../config");

// Append function
const append = function(fileName, fileDir, data, callback){
  // Opening file
  fs.open(config.dataDir+"/"+fileDir+"/"+fileName+".json", "a", function(err, fileDescriptor){
    if(!err&&fileDescriptor){
      // Append to file
      fs.appendFile(fileDescriptor, data, function(err){
        if(!err){
          callback(false);
        }else{
          callback({"Error": "Unable to append to file"});
        }
      })
    }else{
      callback({"Error": "Unable to open file"});
    }
  });
};

// Exporting function
module.exports = append;
