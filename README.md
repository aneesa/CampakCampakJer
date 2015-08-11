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
- [MongoDB](https://www.mongodb.org/)

## Local Installation

1. Clone the repository: `git clone https://ailuromaniac@bitbucket.org/ailuromaniac/campakcampakjer.git`
2. Navigate to the dev mongodb directory: `cd campakcampakjer/dev/mongodb`
3. Create a data folder: `mkdir data`
4. Update dbpath and logpath in mongo.config to point to the data and mongodb respectively
5. Navigate to the server directory: `cd ../server`
6. Install the application: `npm install`
7. Start the local DB: `<MongoDB-bin>/mongod.exe --config <parent-path>/campakcampakjer/dev/mongodb/mongo.config`
8. Start the server: `node server.js`
9. Navigate to the client folder: `cd ../client/CampakCampakJer`
10. Start Ionic: `ionic serve`
11. If the application does not start, view in browser at `http://localhost:8100/`