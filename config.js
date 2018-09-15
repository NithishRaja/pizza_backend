/*
 * File containing config values
 *
 */

// Dependencies
const path = require("path");
const API = require("./API.js");

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
  'stripeUrl': API.stripeUrl,
  'stripeAPIKey': API.stripeAPIKey,
  'mailgunUrl': API.mailgunUrl,
  'mailgunEmail': API.mailgunEmail
};

// Initializing production environment
environment.production = {
  'port': 443,
  'envName': "production",
  'dataDir': path.join(__dirname, "./.data"),
  'menuDir': path.join(__dirname, "./.menu"),
  'cartDir': path.join(__dirname, "./.cart"),
  'hashSecret': "ThisIsMyProductionHashSecret",
  'stripeUrl': API.stripeUrl,
  'stripeAPIKey': API.stripeAPIKey,
  'mailgunUrl': API.mailgunUrl,
  'mailgunEmail': API.mailgunEmail
};

// Deciding which environment to export
const currentEnvironment = typeof(process.env.NODE_ENV)=="string"?process.env.NODE_ENV:"";

// Setting the environment to export
const environmentToExport = typeof(environment[currentEnvironment])=="object"?environment[currentEnvironment]:environment.development;

// Exporting environment
module.exports = environmentToExport;
