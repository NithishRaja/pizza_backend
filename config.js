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
  'stripeAPIKey': "sk_test_FdicNw5uJJG1t5sRMPZcYje4"
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
  'stripeAPIKey': ""
};

// Deciding which environment to export
const currentEnvironment = typeof(process.env.NODE_ENV)=="string"?process.env.NODE_ENV:"";

// Setting the environment to export
const environmentToExport = typeof(environment[currentEnvironment])=="object"?environment[currentEnvironment]:environment.development;

// Exporting environment
module.exports = environmentToExport;
