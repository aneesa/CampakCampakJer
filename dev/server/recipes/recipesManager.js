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
	
	// save a recipe to db
	server.post('/api/campakcampakjer/recipe', function(req, res) {

		// create the new recipe model first
		var newRecipe = new Recipe({ name: req.params.name });
		
		// use mongoose to save the new recipe to the database
		newRecipe.save(function(err, recipeSaved) {
		
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if(err) 
				return res.send(err);
			
			res.json(recipeSaved); // return the recipe in JSON format
        });
	});
	
	// save a recipe step to db
	server.post('/api/campakcampakjer/recipestep', function(req, res) {
	
		// use mongoose to get the recipe and save the new step to the database
		Recipe.findOne({ _id : req.params.recipeId})
			.populate('steps')
			.exec(function(err, recipe) {

				// if there is an error retrieving, send the error. nothing after res.send(err) will execute
				if (err)
					return res.send(err)
					
				// get the new position of the step in recipe
				var newPosition = 0;
				if(recipe.steps.length!=0) newPosition = recipe.steps.length;

				// create the new step with the new position
				var newStep = new RecipeStep();
				newStep.position = recipe.steps.length+1;
				newStep.step = req.params.step;
				
				// save the recipe step
				// if successful, save the recipe with the new step
				newStep.save(function(err, recipeStepSaved) {
		
					// if there is an error retrieving, send the error. nothing after res.send(err) will execute
					if(err) 
						return res.send(err);
						
					// add the new step to the recipe
					recipe.steps.push(recipeStepSaved);
					
					// save the recipe
					recipe.save(function(err, recipeSaved) {
			
						// if there is an error retrieving, send the error. nothing after res.send(err) will execute
						if(err) 
							return res.send(err);
							
						
						res.json(recipeSaved); // return the recipe in JSON format
					});
					
				});
				
				
		});
	});
	
	// delete an existing recipe step from db
    server.del('/api/campakcampakjer/recipestep/:recipeId/:id', function (req, res) {
	
		// first find the recipe step
		// remove it from db
		// remove it from recipe.steps
		// get the position
		// rearrange position
	
		// use mongoose to get the recipe step by id and remove it from db
		RecipeStep.findById(req.params.id, function(err, recipeStepToBeRemoved) {
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if(err) 
				return res.send(err);

			// Find the parent recipe
			Recipe.findOne({ _id : req.params.recipeId})
			.populate('steps')
			.exec(function(err, recipe) {
				// if there is an error retrieving, send the error. nothing after res.send(err) will execute
				if(err) 
					return res.send(err);
					
				var recipeStepPosition = recipeStepToBeRemoved.position;	// index in array = position-1
				
				// remove step from recipe's step array
				recipe.steps.splice(recipeStepPosition-1,1);
				
				// for each step after the removed step, update their position and save in db
				for(var i = recipeStepPosition-1; i < recipe.steps.length; i++) {
					var curRecipeStep = recipe.steps[i];
					curRecipeStep.position -= 1;
					
					curRecipeStep.save(function(err, recipeStepSaved) {
						// if there is an error retrieving, send the error. nothing after res.send(err) will execute
						if(err) 
							return res.send(err);
					});
				}
				
				// now that all the steps have been updated, save the recipe
				recipe.save(function(err, recipeSaved) {
					// if there is an error retrieving, send the error. nothing after res.send(err) will execute
					if(err) 
						return res.send(err);
						
					// finally, remove the step from db
					recipeStepToBeRemoved.remove(function(err) {
						// if there is an error retrieving, send the error. nothing after res.send(err) will execute
						if(err) 
							return res.send(err);
							
						res.json(recipeSaved); // return the recipe updated in JSON format
					});	
				});	
			});
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
}