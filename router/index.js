/*
 * Container file for routes
 *
 */

// Dependencies
const ping = require("./ping");
const notFound = require("./notFound");
const users = require("./users");
const tokens = require("./tokens");
const menu = require("./menu");
const cart = require("./cart");
const order = require("./order");

// Container object
const router = {
  'ping': ping,
  'users': users,
  'tokens': tokens,
  'menu': menu,
  'cart': cart,
  'order': order,
  'notFound': notFound
};

// Exporting module
module.exports = router;
