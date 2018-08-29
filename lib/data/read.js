/*
 * Function to read JSON from files
 *
 */

// Dependencies
const fs = require("fs");
const config = require("./../../config");
const _helpers = require("./../helpers");

// Read function
const read = function(fileName, fileDir, callback){
  // Open file for reading. Throws error if file doesn't exist
  fs.open(config.dataDir+"/"+fileDir+"/"+fileName+".json", "r", function(err, fileDescriptor){
    if(!err&&fileDescriptor){
      // Reading from file
      fs.readFile(fileDescriptor, function(err, fileData){
        if(!err){
          // Closing file
          fs.close(fileDescriptor, function(err){
            if(!err){
              // Parsing file data
              const fileDataObject = _helpers.parse(fileData);
              callback(false, fileDataObject);
            }else{
              callback({"Error": "Unable to close file"});
            }
          });
        }else{
          callback({"Error": "Unable to read from file"});
        }
      });
    }else{
      callback({"Error": "Unable to open file. File may not exists"});
    }
  });
};

// Exporting module
module.exports = read;
