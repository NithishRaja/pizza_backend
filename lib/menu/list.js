/*
 * File containing to get menu items list
 *
 */

// Dependencies
const fs = require("fs");
const util = require("util");
const debug = util.debuglog("menu");
const config = require("./../../config");

// Function to get menu items list
const list = function(callback){
  fs.readdir(config.menuDir, function(err, menuList){
    if(!err&&menuList){
      let trimmedFileList = [];
      // Removing .json from file names
      menuList.forEach(function(menuItem){
        trimmedFileList.push(menuItem.replace(".json", ""));
      });
      callback(false, trimmedFileList);
    }else{
      debug("Error getting menu items list", err);
      callback({"Error": "Unable to get menu items list"});
    }
  });
};

// Exporting module
module.exports = list;
