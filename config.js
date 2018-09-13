/*
 * File containing config values
 *
 */

// Dependencies
const path = require("path");

// Creating environment container
let environment = {};

// Initializing development environment
environment.development = {
  'port': 80,
  'envName': "development",
  'dataDir': path.join(__dirname, "./.data"),
  'menuDir': path.join(__dirname, "./.menu"),
  'cartDir': path.join(__dirname, "./.data/cart"),
  'hashSecret': "ThisIsMyHashSecret",
  'stripeUrl': "https://api.stripe.com/v1/charges",
  'stripeAPIKey': "sk_test_FdicNw5uJJG1t5sRMPZcYje4",
  'mailgunUrl': "https://api:ebf50873675cebf204979c29f63730c2-7bbbcb78-88cde6e2@api.mailgun.net/v3/sandbox03683a43ac9d46abb8795bb8f72b6def.mailgun.org/messages",
  'mailgunEmail': "mailgun@sandbox03683a43ac9d46abb8795bb8f72b6def.mailgun.org"
};

// Initializing production environment
environment.production = {
  'port': 443,
  'envName': "production",
  'dataDir': path.join(__dirname, "./.data"),
  'menuDir': path.join(__dirname, "./.menu"),
  'cartDir': path.join(__dirname, "./.cart"),
  'hashSecret': "ThisIsMyProductionHashSecret",
  'stripeUrl': "api.stripe.com/v1/charges",
  'stripeAPIKey': "",
  'mailgunUrl': "",
  'mailgunEmail': ""
};

// Deciding which environment to export
const currentEnvironment = typeof(process.env.NODE_ENV)=="string"?process.env.NODE_ENV:"";

// Setting the environment to export
const environmentToExport = typeof(environment[currentEnvironment])=="object"?environment[currentEnvironment]:environment.development;

// Exporting environment
module.exports = environmentToExport;
