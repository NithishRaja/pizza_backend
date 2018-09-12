/*
 * Function to parse buffer
 *
 */

// Parse function
const parse = function(buffer){
  try{
    return JSON.parse(buffer);
  }catch(e){
    return {};
    console.log("\x1b[31m",e);
  }
};

// Exporting module
module.exports = parse;
