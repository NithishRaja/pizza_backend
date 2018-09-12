/*
 * FIle containing logic to append to file
 *
 */

// Dependencies
const fs = require("fs");
const config = require("./../../config");

// Append function
const append = function(fileName, data, callback){
  // Opening file
  fs.open(config.cartDir+"/"+fileName+".json", 'a', function(err, fileDescriptor){
    if(!err&&fileDescriptor){
      // Converting data to string
      const dataString = JSON.stringify(data)+"\n";
      // Appending to file
      fs.appendFile(fileDescriptor, dataString, function(err){
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
          callback({"Error": "Unable to append to file"});
        }
      });
    }else{
      console.log("\x1b[31m",err);
      callback({"Error": "Unable to open file"});
    }
  });
};

// Exporting function
module.exports = append;
