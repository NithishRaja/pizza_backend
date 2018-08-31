/*
 * File containing function to read from cart
 *
 */

// Dependencies
const fs = require("fs");
const _helpers = require("./../helpers");
const config = require("./../../config");

// Read function
const read = function(fileName, callback){
  // Opening file
  fs.open(config.cartDir+"/"+fileName+".json", "r", function(err, fileDescriptor){
    if(!err){
      // Reading file
      fs.readFile(fileDescriptor, function(err, cartData){
        if(!err&&cartData){
          // Initializing final array
          let finalArray = [];
          // converting cart data to string
          let cartDataString = cartData.toString();
          // Removing '\n' and separating objects into finalArray
          cartDataString.split("\n").forEach(function(item){
            finalArray.push(_helpers.parse(item));
          });
          // Removing last element
          finalArray.pop();
          // Returning final array
          callback(false, finalArray);
        }else{
          callback({"Error": "Unable to read file"});
        }
      });
    }else{
      // File does not exist. Creating file
      fs.open(config.cartDir+"/"+fileName+".json", "wx", function(err, fileDescriptor){
        if(!err){
          // Writing empty string to file
          fs.writeFile(fileDescriptor, "", function(err){
            if(!err){
              // Closing file
              fs.close(fileDescriptor, function(err){
                if(!err){
                  callback(false, []);
                }else{
                  callback({"Error": "Unable to close file"});
                }
              });
            }else{
              callback({"Error": "Unable to write to file"});
            }
          });
        }else{
          callback({"Error": "Unable to create file"});
        }
      });
    }
  });
};

// Exporting function
module.exports = read;
