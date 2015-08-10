module.exports = function (server, db) {

	// get all the recipes
    server.get("/api/campakcampakjer/recipes", function (req, res, next) {
		db.recipes.find({},function (err, recipes) {
			res.writeHead(200, {
				'Content-Type': 'application/json; charset=utf-8'
			});
			res.end(JSON.stringify(recipes));
		});
        return next();
    });

	// get a recipe from id
    server.get('/api/campakcampakjer/recipe/:id', function (req, res, next) {
		db.recipes.find({
			_id: db.ObjectId(req.params.id)
		}, function (err, recipe) {
			res.writeHead(200, {
				'Content-Type': 'application/json; charset=utf-8'
			});
			res.end(JSON.stringify(recipe));
		});
        return next();
    });

	// save a new recipe
    server.post('/api/campakcampakjer/recipe', function (req, res, next) {
		var recipe = req.params;
		db.recipes.save(recipe,
			function (err, recipe) {
				res.writeHead(200, {
					'Content-Type': 'application/json; charset=utf-8'
				});
				res.end(JSON.stringify(recipe));
			});
        return next();
    });

	// update an existing recipe
    server.put('/api/campakcampakjer/recipe/:id', function (req, res, next) {
		db.recipes.findOne({
			_id: db.ObjectId(req.params.id)
		}, function (err, recipe) {
			// merge req.params/recipe with the server/recipe

			var updatedRecipe = {}; // updated recipe 
			// logic similar to jQuery.extend(); to merge 2 objects.
			for (var n in recipe) {
				updatedRecipe[n] = recipe[n];
			}
			for (var n in req.params) {
				if (n != "id")
					updatedRecipe[n] = req.params[n];
			}
			db.recipes.update({
				_id: db.ObjectId(req.params.id)
			}, updatedRecipe, {
			//	multi: false
			}, function (err, recipe) {
				res.writeHead(200, {
					'Content-Type': 'application/json; charset=utf-8'
				});
				res.end(JSON.stringify(recipe));
			});
		});
        return next();
    });

	// delete recipe
    server.del('/api/campakcampakjer/recipe/:id', function (req, res, next) {
		db.recipes.remove({
			_id: db.ObjectId(req.params.id)
		}, function (err, recipe) {
			res.writeHead(200, {
				'Content-Type': 'application/json; charset=utf-8'
			});
			res.end(JSON.stringify(recipe));
		});
		return next();
    });

}