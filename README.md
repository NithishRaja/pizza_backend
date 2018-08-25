# Pizza Backend

RESTful API for a pizza delivery service

## Setting up and running app

* Create `/.data` directory in root path
* Create `/users` and `/tokens` directories in `/.data` path
* Open cli and navigate to root path of project and run `node index.js`
* To view logs of a particular module run the following `NODE_DEBUG=[module name] node index.js`
* To view logs of a particular module run the following on windows `set NODE_DEBUG=[module name] && node index.js`

## Editing code
* Code regarding interaction with file system can be found in `/lib/data` directory
* Helper functions can be found in `/lib/helpers`
* Logic for all routes are present in their own directory inside `/router` directory
* Configuration parameters for app are located in `config.json` file

## Features
* Can read, create, update and delete user data by listening to oncoming request
* Can read, create, update and delete token data by listening to oncoming request
* Contains token verification to retrieve, edit or delete user data
