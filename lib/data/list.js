/*
 * File containing function to get list of file names
 *
 */

// Dependencies
const fs = require("fs");
const config = require("./../../config");

// List function
const list = function(dirName, callback){
  // Getting file names
  fs.readdir(config.dataDir+"/"+dirName, function(err, fileList){
    if(!err&&fileList){
      let trimmedFileList = [];
      // Removing .json from file names
      fileList.forEach(function(fileName){
        trimmedFileList.push(fileName.replace(".json", ""));
      });
      callback(false, trimmedFileList);
    }else{
      callback({"Error": "Unable to read directory"});
    }
  });
};

// Exporting module
module.exports = list;
