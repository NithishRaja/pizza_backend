/*
 * File containing function to create random id
 *
 */

// Function to create random id
const createRandomId = function(size){
  // Setting allowed characters
  const allowedCharacters = "1234567890qwertyuiopasdfghjklzxcvbnm";
  // Declaring final string
  let finalString = "";
  for(let i=0;i<size;++i){
    // Getting selected character
    const selectedCharacter = allowedCharacters.charAt(Math.floor(Math.random(allowedCharacters.length)*20));
    // Appending to final string
    finalString+=selectedCharacter;
  }
  // Returning final string
  return finalString;
};

// Exporting module
module.exports = createRandomId;
