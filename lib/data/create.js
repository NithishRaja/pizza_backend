/*
 * Function to create JSON files
 *
 */

// Dependencies
const fs = require("fs");
const config = require("./../../config");

// create function
const create = function(fileName, fileDir, data, callback){
  // Opening file, throws error if file exists. If file doesn't exist, file is created
  fs.open(config.dataDir+"/"+fileDir+"/"+fileName+".json", "wx", function(err, fileDescriptor){
    if(!err&&fileDescriptor){
      // Converting JSON object to string
      const dataString = JSON.stringify(data);
      // Writing data to file
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
          callback({"Error": "Unable to write to file"});
        }
      })
    }else{
      callback({"Error": "File cannot be created or file already exists"});
    }
  });
};

// Exporting module
module.exports = create;
