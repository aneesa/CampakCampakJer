module.exports = function (server, db) {

	// get all the recipes from db
    server.get("/api/campakcampakjer/recipes", function (req, res, next) {
		db.recipes.find({},function (err, recipes) {
			res.writeHead(200, {
				'Content-Type': 'application/json; charset=utf-8'
			});
			res.end(JSON.stringify(recipes));
		});
        return next();
    });

	// get a recipe by id from db
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

	// save a recipe to db
    server.post('/api/campakcampakjer/recipe', function (req, res, next) {
		var newRecipe = req.params;
		db.recipes.save(newRecipe,
			function (err, recipe) {
				res.writeHead(200, {
					'Content-Type': 'application/json; charset=utf-8'
				});
				res.end(JSON.stringify(recipe));
			});
        return next();
    });

	// update an existing recipe in db
    server.put('/api/campakcampakjer/recipe/:id', function (req, res, next) {
		db.recipes.findOne({
			_id: db.ObjectId(req.params.id)
		}, function (err, recipe) {
			// merge req.params/product with the server/product

			var updatedRecipe = {}; // updated products 
			// logic similar to jQuery.extend(); to merge 2 objects.
			for (var n in recipe) {
				updatedRecipe[n] = recipe[n];
			}
			for (var n in req.params) {
				if (n != "id")
					updatedRecipe[n] = req.params[n];
			}
			db.bucketLists.update({
				_id: db.ObjectId(req.params.id)
			}, updatedRecipe, {
				multi: false
			}, function (err, recipe) {
				res.writeHead(200, {
					'Content-Type': 'application/json; charset=utf-8'
				});
				res.end(JSON.stringify(recipe));
			});
		});
        return next();
    });

	// delete an existing recipe from db
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