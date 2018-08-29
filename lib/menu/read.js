/*
 * File containing logic to read menu item data
 *
 */

// Dependencies
const fs = require("fs");
const util = require("util");
const debug = util.debuglog("menu");
const config = require("./../../config");
const _helpers = require("./../helpers");

// Read function
const read = function(fileName, callback){
  // Reading file
  fs.open(config.menuDir+"/"+fileName+".json", "r", function(err, fileDescriptor){
    if(!err&&fileDescriptor){
      // Reading from file
      fs.readFile(fileDescriptor, function(err, menuData){
        if(!err&&menuData){
          // Parsing menu data
          const menuDataObject = _helpers.parse(menuData);
          callback(false, menuDataObject);
        }else{
          debug("Error while reading file", err);
          callback({"Error": "Unable to read file"});
        }
      });
    }else{
      debug("Error while opening file", err);
      callback({"Error": "Unable to open file"});
    }
  });
};

// Exporting function
module.exports = read;
