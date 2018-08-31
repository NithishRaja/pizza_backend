/*
 * File containing logic to delete cart file
 *
 */

// Dependencies
const fs = require("fs");
const config = require("./../../config");

// Delete function
const remove = function(fileName, callback){
  // Deleting file
  fs.unlink(config.cartDir+"/"+fileName+".json", function(err){
    if(!err){
      callback(false);
    }else{
      callback({"Error": "Unable to delete file"});
    }
  });
};

// Exporting function
module.exports = remove;
