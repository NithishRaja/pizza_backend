/*
 * File to archive cart details
 *
 */

// Dependencies
const zlib = require("zlib");
const fs = require("fs");
const _cart = require("./../../../lib/cart");
const config = require("./../../../config");

// Function to compress and asve cart details
const archive = function(email){
  // Reading cart
  _cart.read(email, function(err, cartArray){
    if(!err){
      // Converting objects inside array into strings
      cartArray.forEach(function(cartItem, index){
        cartArray[index]=JSON.stringify(cartItem);
      });
      const cartArrayString = cartArray.toString();
      // Compressing cart details using gzip
      zlib.gzip(cartArrayString, function(err, buffer){
        if(!err){
          // Creating file with email and current time
          fs.open(config.cartDir+"/"+email+"-"+Date.now()+".gz.b64", "w", function(err, fileDescriptor){
            if(!err){
              // Writing data to file
              fs.writeFile(fileDescriptor, buffer.toString("base64"), function(err){
                if(!err){
                  // Closing file
                  fs.close(fileDescriptor, function(err){
                    if(!err){
                      // deleting cart
                      _cart.delete(email, function(err){
                        if(err){
                          console.log("Error while deleting cart after archiving", err);
                        }
                      });
                    }else{
                      console.log("Error while closing archive file", err);
                    }
                  });
                }else{
                  console.log("Error while writing to archive file", err);
                }
              });
            }else{
              console.log("Error while opening archive file", err);
            }
          });
        }else{
          console.log("Error while compressing cart details", err);
        }
      });
    }else{
      console.log("Error while reading cart details", err);
    }
  });
};

// Exporting function
module.exports = archive;
