# Pizza Backend

RESTful API for a pizza delivery service. Uses stripe for payment and mailgun for email alerts.

## Setting up and running app

* Create `/.data` directory in root path
* Create `/users` and `/tokens` directories in `/.data` path
* Create an `API.js` file with the following keys and corresponding values: stripeUrl, stripeAPIKey, mailgunUrl, mailgunEmail
* Open cli and navigate to root path of project and run `node index.js`
* To view logs of a particular module run the following `NODE_DEBUG=[module name] node index.js`
* To view logs of a particular module run the following on windows `set NODE_DEBUG=[module name] && node index.js`

## Editing code
* Code regarding interaction with file system can be found in `/lib/data` directory
* Code for interaction with cart files can be found in `/lib/cart`
* Code for interaction with cart files can be found in `/lib/menu`
* Helper functions can be found in `/lib/helpers`
* Logic for all routes are present in their own directory inside `/router` directory
* Configuration parameters for app are located in `config.json` file

## Features
* Can read, create, update and delete user data by listening to oncoming request
* Can read, create, update and delete token data by listening to oncoming request
* Contains token verification to retrieve, edit or delete user data
* Can send list of all menu items or send details of menu items according to oncoming request
* Has separate CRUD operation for cart files
* Worker deletes all expired tokens every 24hrs
* Cart is archived with timestamp after transaction is completed for referencing later on
* Payment is done by using stripe API
* Bill is sent to user by using mailgun API
