# CampakCampakJer App - Your Personal Cookbook

This app is built for learning purposes. User can add his/her own recipe into the cookbook.

Functionalities:

- add new recipes
- add recipe's steps
- edit recipe's name
- edit recipe's step
- remove recipe's step

This app is built using MongoDB, Node.js and Ionic Framework.

- Node.js provides the RESTful API. 
- Ionic Framework provides the frontend and accesses the API. 
- MongoDB stores the data.

This app is built based on the below tutorial

* Tutorial : http://thejackalofjavascript.com/an-end-to-end-hybrid-app

## Requirements

- [Node and npm](http://nodejs.org)
- [Ionic Framework](http://ionicframework.com/)
- [MongoDB](https://www.mongodb.org/)

## Source code

Clone the repository: `git clone https://ailuromaniac@bitbucket.org/ailuromaniac/campakcampakjer.git`

## Local Installation

1. Navigate to the dev mongodb directory: `cd campakcampakjer/dev/mongodb`
2. Create a data folder: `mkdir data`
3. Update dbpath and logpath in mongo.config to point to the data and mongodb respectively
4. Navigate to the server directory: `cd ../server`
5. Install the application: `npm install`
6. Start the local DB: `<MongoDB-bin>/mongod.exe --config <parent-path>/campakcampakjer/dev/mongodb/mongo.config`
7. Start the server: `node server.js`
8. Navigate to the client folder: `cd ../client/CampakCampakJer`
9. Start Ionic: `ionic serve`
10. If the application does not start, view in browser at http://localhost:8100/

## OpenShift Environment (test)

REST Server: http://campakcampakjer-ailuromaniac.rhcloud.com

1. For example, to see all the recipes in the db, view in browser at http://campakcampakjer-ailuromaniac.rhcloud.com/api/campakcampakjer/recipes
2. To open the client, navigate to the client folder in openshift environment: `cd campakcampakjer/openshift/client/CampakCampakJer`
3. Start Ionic: `ionic serve`
4. If the application does not start, view in browser at http://localhost:8100/