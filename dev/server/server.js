var restify     = require('restify');		// framework for building REST APIs
var mongoose 	= require('mongoose');		// mongoose for mongodb
var	morgan  	= require('morgan');		// log requests to the console

var port  	 = 9804; 			// set the port
var address  = '127.0.0.1'; 	// Listen to localhost 

// db config
var database = "mongodb://localhost/campakcampakjerdb"; // "username:password@example.com/mydb"
mongoose.connect(database);
console.log("MongoDB connected @ " + database);

// create REST server
var server      	=   restify.createServer();

// logging config
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(morgan('dev')); // LOGGER

// CORS (Cross Origin Request Sharing)
// allows any web based client to access this server
server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// model managers
require('./recipes/recipesManager.js')(server);

// set server to listen for requests
server.listen(port, address, function () {
    console.log("Server started @ " + address + ":" + port);
});