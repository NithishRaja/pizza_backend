/*
 * Function to send mail to user
 *
 */

// Dependencies
const util = require("util");
const debug = util.debuglog("order");
const https = require("https");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const querystring = require("querystring");
const config = require("./../../../config");
const _cart = require("./../../../lib/cart");
const archiveCart = require("./archiveCart");

// Send mail function
const sendMail = function(email, amount, currency){
  // Parsing url
  const parsedUrl = url.parse(config.mailgunUrl);
  let table = "<table><tr><th>S.No</th><th>Item</th><th>Number</th></tr>";
  // Reading cart
  _cart.read(email, function(err, cartArray){
    if(!err&&cartArray&&cartArray.length>0){
      // Looping through cart items
      cartArray.forEach(function(cartItem, index){
        table+="<tr><td>"+(index+1)+"</td><td>"+cartItem.item+"</td><td>"+cartItem.noOfItem+"</td></tr>";
      });
      table+="</table>";
    }else{
      debug("Error while reading cart", err);
    }
  });
  // Setting content of mail
  const text = table+"You have placed an order of "+amount+" "+currency;
  // Setting query parameters
  const query = {
    'from': "from=Pizza_Backend "+config.mailgunEmail,
    'to': "to="+email,
    'text': text,
    'subject': "Order placed"
  }
  const queryString = querystring.stringify(query);
  // Setting request details
  const requestDetails = {
    'protocol': parsedUrl.protocol,
    'method': 'POST',
    'auth': parsedUrl.auth,
    'hostname': parsedUrl.hostname,
    'path': parsedUrl.path+"?"+queryString,
    'timeout': 5*1000
  };
  // Creating https request
  const req = https.request(requestDetails, function(res){
    let decoder = new StringDecoder("utf-8");
    let buffer="";
    // Listening to data
    res.on("data", function(data){
      buffer+=decoder.write(data);
    });
    // Logging data onto console
    res.on("end", function(){
      buffer+=decoder.end();
      console.log("Response payload from mailgun: ",buffer);
    });
    // Logging response code to console
    console.log("Response status code from mailgun: ",res.statusCode);
    // Calling function to archive cart
    archiveCart(email);
  });
  const payloadString = "from="+config.mailgunEmail;
  // Listening to error
  req.on("error", function(err){
    debug("Error while sending request to mailgun", err);
  });
  // Listening to timeout
  req.on("timeout", function(err){
    debug("Request to mailgun timedout", err);
  });
  // Sending request
  req.end();
};

// Exporting function
module.exports = sendMail;
