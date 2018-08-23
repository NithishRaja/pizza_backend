/*
 * File containing default route (not found route)
 *
 */

// notFound function
const notFound = function(data, callback){
  callback(404, {"Error": "The page you were looking were could not be found. It may have been taken down or moved to a diffrent location"});
};

// exporting function
module.exports = notFound;
