/*
 * Container file for routes
 *
 */

// Dependencies
const ping = require("./ping");
const notFound = require("./notFound");
const users = require("./api/users");
const tokens = require("./api/tokens");
const menu = require("./api/menu");
const cart = require("./api/cart");
const order = require("./api/order");

// Container object
const router = {
  'ping': ping,
  'api/users': users,
  'api/tokens': tokens,
  'api/menu': menu,
  'api/cart': cart,
  'api/order': order,
  'notFound': notFound
};

// Exporting module
module.exports = router;
