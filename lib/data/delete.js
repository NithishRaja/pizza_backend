/*
 * Function to delete JSON files
 *
 */

// Dependencies
const fs = require("fs");
const config = require("./../../config");

// Delete function
const remove = function(fileName, fileDir, callback){
  // Opening file. Throw error if file doens't exist
  fs.unlink(config.dataDir+"/"+fileDir+"/"+fileName+".json", function(err){
    if(!err){
      callback(false);
    }else{
      callback({"Error": "Unable to delete file"});
    }
  });
};

// Exporting module
module.exports = remove;
