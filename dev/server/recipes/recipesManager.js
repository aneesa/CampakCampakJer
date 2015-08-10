var Recipe = require('./models/recipe');
var RecipeStep = require('./models/recipeStep');

module.exports = function(server) {

	// get all the recipes from db
	server.get('/api/campakcampakjer/recipes', function(req, res) {

		// use mongoose to get all recipes in the database
		Recipe.find()
			.populate('steps')
			.exec(function(err, recipes) {

				// if there is an error retrieving, send the error. nothing after res.send(err) will execute
				if (err)
					return res.send(err)

				res.json(recipes); // return all recipes in JSON format
		});
	});
	
	// get a recipe by id from db
	server.get('/api/campakcampakjer/recipe/:id', function(req, res) {

		// use mongoose to get the recipe by id from the database
		Recipe.findOne({ _id : req.params.id})
			.populate('steps')
			.exec(function(err, recipe) {

				// if there is an error retrieving, send the error. nothing after res.send(err) will execute
				if (err)
					return res.send(err)

				res.json(recipe); // return the recipe in JSON format
		});
	});
	
	// save a recipe to db and sen
	// create ship captain and send back all ship captains after creation
	server.post('/api/campakcampakjer/recipe', function(req, res) {

		// create the new recipe model first
		var newRecipe = new Recipe({ name: req.params.name});
		
		// TODO: update the steps as well
		
		// use mongoose to save the new recipe to the database
		newRecipe.save(function(err, recipeSaved) {
		
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if(err) 
				return res.send(err);
			
			res.json(recipeSaved); // return the recipe in JSON format
        });
	});
	
//	// update an existing recipe in db
//    server.put('/api/campakcampakjer/recipe/:id', function (req, res) {
//	
//		// use mongoose to get the recipe by id from the database
//		Recipe.findOne({ _id : req.params.id})
//			.populate('steps')
//			.exec(function(err, recipe) {
//
//				// if there is an error retrieving, send the error. nothing after res.send(err) will execute
//				if (err)
//					return res.send(err)
//
//				res.json(recipe); // return the recipe in JSON format
//		});
//	
////		db.recipes.findOne({
////			_id: db.ObjectId(req.params.id)
////		}, function (err, recipe) {
////			// merge req.params/product with the server/product
////
////			var updatedRecipe = {}; // updated products 
////			// logic similar to jQuery.extend(); to merge 2 objects.
////			for (var n in recipe) {
////				updatedRecipe[n] = recipe[n];
////			}
////			for (var n in req.params) {
////				if (n != "id")
////					updatedRecipe[n] = req.params[n];
////			}
////			db.bucketLists.update({
////				_id: db.ObjectId(req.params.id)
////			}, updatedRecipe, {
////				multi: false
////			}, function (err, recipe) {
////				res.writeHead(200, {
////					'Content-Type': 'application/json; charset=utf-8'
////				});
////				res.end(JSON.stringify(recipe));
////			});
////		});
//    });
	
	// delete an existing recipe from db
 //   server.del('/api/campakcampakjer/recipe/:id', function (req, res, next) {
	//	db.recipes.remove({
	//		_id: db.ObjectId(req.params.id)
	//	}, function (err, recipe) {
	//		res.writeHead(200, {
	//			'Content-Type': 'application/json; charset=utf-8'
	//		});
	//		res.end(JSON.stringify(recipe));
	//	});
	//	return next();
 //   });
}