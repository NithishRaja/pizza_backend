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
    console.log(e);
  }
};

// Exporting module
module.exports = parse;
