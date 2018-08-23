/*
 * Function to update JSON from files
 *
 */

// Dependencies
const fs = require("fs");
const config = require("./../../config");

// update function
const update = function(fileName, fileDir, data, callback){
  // Opening file. If file doesn't exist, throw error
  fs.open(config.dataDir+"/"+fileDir+"/"+fileName+".json", "w+", function(err, fileDescriptor){
    if(!err&&fileDescriptor){
      // Converting data to string
      const dataString = JSON.stringify(data);
      // Writing to file
      fs.writeFile(fileDescriptor, dataString, function(err){
        if(!err){
          // Closing file
          fs.close(fileDescriptor, function(err){
            if(!err){
              callback(false);
            }else{
              callback({"Error": "Unable to close file"});
            }
          });
        }else{
          callback({"Error": "Unable to write data to file"});
        }
      });
    }else{
      callback({"Error": "Unable to open file. File may not exist"});
    }
  });
};

// Exporting module
module.exports = update;
