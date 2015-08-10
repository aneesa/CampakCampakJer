var restify     =   require('restify');
var mongojs     =   require('mongojs');
var	morgan  	= 	require('morgan');

// db config name and collections
var db          =   mongojs('campakcampakjerdb', ['recipes']);
var server      =   restify.createServer();

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

// set server to listen for requests
server.listen(process.env.PORT || 9804, function () {
    console.log("Server started @ ", process.env.PORT || 9804);
});

// model managers
var recipesManager =   require('./recipes/recipesManager')(server, db);