angular.module('CampakCampakJer.controllers', ['CampakCampakJer.services'])

// controller for recipes/list tab	
.controller('myRecipeListCtrl', function ($rootScope, $scope, API, $timeout, $ionicModal, $window) {
	// display all recipes when the tab is selected
    $rootScope.$on('fetchAll', function(){
        API.getAllRecipes().success(function (data, status, headers, config) {
            $scope.recipes = [];
            for (var i = 0; i < data.length; i++) {
                $scope.recipes.push(data[i]);
            };
            if($scope.recipes.length == 0)
            {
                $scope.noData = true;
            }
            else
            {
                $scope.noData = false;
            }

			// set up slide-up for creating new recipe
            $ionicModal.fromTemplateUrl('templates/slide-newrecipe.html', function (modal) {
                $scope.newTemplate = modal;
            });

			// show slide-up for creating new recipe when called
            $scope.newRecipe = function () {
                $scope.newTemplate.show();
            };
        }).error(function (data, status, headers, config) {
			// if error, notify error message to users
            $rootScope.notify("Oops something went wrong!! Please try again later");
        });
    });

    $rootScope.$broadcast('fetchAll');

	// delete recipe
    $scope.deleteRecipe = function (id) {			
		// delete the recipe
		API.deleteRecipe(id)
			.success(function (data, status, headers, config) {
				// if successful, refresh to the recipe's details tab
				$rootScope.doRefresh(1);
			})
			.error(function (data, status, headers, config) {
				// if error, notify error messages to user
				$rootScope.notify("Oops something went wrong!! Please try again later");
			});
    };
})

// controller for slide-newrecipe.html
.controller('myNewRecipeCtrl', function ($rootScope, $scope, API, $window) {

		// reset the new recipe
        $scope.recipe = {
	        name: ""
	    };

		// close this slide-up when called
        $scope.close = function () {
            $scope.modal.hide();
        };

		// create and save a new recipe when called
        $scope.createNewRecipe = function () {
			// get the recipe's name
			// if name is empty, return nothing 
			// else close this slide-up and save the new recipe
			var name = this.recipe.name;
        	if (!name) return;
            $scope.modal.hide();

			// get the data from user
            var form = {
                name: name,
                created: Date.now(),
                updated: Date.now()
            }

			// save the recipe
            API.saveRecipe(form)
                .success(function (data, status, headers, config) {
					// if successful, refresh to the recipe's details tab
                    $rootScope.doRefresh(1);
                })
                .error(function (data, status, headers, config) {
					// if error, notify error messages to user
                    $rootScope.notify("Oops something went wrong!! Please try again later");
                });
        };
    })
	
// controller for recipes/details tab	
.controller('myRecipeDetailsCtrl', function ($rootScope, $scope, $stateParams, API, $timeout, $ionicModal, $window) {

	// display all recipes when the tab is selected
    $rootScope.$on('fetchDetails', function(){
        API.getOneRecipe($stateParams.id).success(function (data, status, headers, config) {
            $scope.recipe = data;

			// TODO: allow adding new recipe from this page/tab
			// set up slide-up for creating new recipe
            /*$ionicModal.fromTemplateUrl('templates/slide-newrecipe.html', function (modal) {
                $scope.newTemplate = modal;
            });

			// show slide-up for creating new recipe when called
            $scope.newRecipe = function () {
                $scope.newTemplate.show();
            };*/
			
			// set up slide-up for editing the recipe's name
			$ionicModal.fromTemplateUrl('templates/slide-editrecipe.html', function (modal) {
                $scope.editRecipeTemplate = modal;
            }, {
				// Use our scope for the scope of the modal to keep it simple
				scope: $scope
			});

			// show slide-up for editing the recipe's name when called
            $scope.editRecipe = function () {
				// save the original step in case user cancels
				$scope.originalName = $scope.recipe.name;
                $scope.editRecipeTemplate.show();
            };
			
			// set up slide-up for editing the recipe step
			$ionicModal.fromTemplateUrl('templates/slide-editrecipestep.html', function (modal) {
                $scope.editRecipeStepTemplate = modal;
            }, {
				// Use our scope for the scope of the modal to keep it simple
				scope: $scope
			});

			// show slide-up for editing the recipe step when called
            $scope.editRecipeStep = function (recipestep) {
				$scope.recipestep = recipestep;
				// save the original step in case user cancels
				$scope.originalStep = recipestep.step;
                $scope.editRecipeStepTemplate.show();
            };
			
        }).error(function (data, status, headers, config) {
			// if error, notify error message to users
            $rootScope.notify("Oops something went wrong!! Please try again later");
        });
    });
	
    $rootScope.$broadcast('fetchDetails');
	
	// add a step to recipe
	$scope.addRecipeStep = function () {
		// get the recipe's step
		// if step is empty, return nothing 
		// else close this slide-up and save the new recipe
		var addStep = this.recipe.addStep;
		if (!addStep) return;

		// get the data from user
		var form = {
			recipeId: this.recipe._id,
			step: addStep,
			created: Date.now(),	// TODO: make use of these dates in db
			updated: Date.now()
		}

		// save the recipe step
		API.saveRecipeStep(form)
			.success(function (data, status, headers, config) {
				// if successful, refresh to the recipe's details tab
				$rootScope.doRefresh(2);
			})
			.error(function (data, status, headers, config) {
				// if error, notify error messages to user
				$rootScope.notify("Oops something went wrong!! Please try again later");
			});
	};

	// delete recipe step
    $scope.deleteRecipeStep = function (recipeId, id) {			
		// delete the recipe step
		API.deleteRecipeStep(recipeId, id)
			.success(function (data, status, headers, config) {
				// if successful, refresh to the recipe's details tab
				$rootScope.doRefresh(2);
			})
			.error(function (data, status, headers, config) {
				// if error, notify error messages to user
				$rootScope.notify("Oops something went wrong!! Please try again later");
			});
    };
})

// controller for slide-editrecipe.html
.controller('myRecipeCtrl', function ($rootScope, $scope, API, $window) {

		// close this slide-up when called
        $scope.close = function () {
			$scope.recipe.name = $scope.originalName;
            $scope.editRecipeTemplate.hide();
        };

		// update a recipe when called
        $scope.updateRecipe = function (id) {
			// get the recipe's name
			// if name is empty, return nothing 
			// else close this slide-up and save the new recipe
			var name = this.recipe.name;
        	if (!name) return;

			// get the data from user
            var form = {
                name: name
            }

			// update the recipe
            API.updateRecipe(id, form)
                .success(function (data, status, headers, config) {
					// if successful, refresh to the recipe's details tab
					$scope.editRecipeTemplate.hide();
                })
                .error(function (data, status, headers, config) {
					// if error, notify error messages to user
                    $rootScope.notify("Oops something went wrong!! Please try again later");
                });
        };
    })

// controller for slide-editrecipestep.html
.controller('myRecipeStepCtrl', function ($rootScope, $scope, API, $window) {


		// close this slide-up when called
        $scope.close = function () {
			$scope.recipestep.step = $scope.originalStep;
            $scope.editRecipeStepTemplate.hide();
        };
		
		// update recipe step
		$scope.updateRecipeStep = function (id) {

			// get the recipe's step
			// if step is empty, return nothing 
			// else close this slide-up and save the new recipe
			var step = this.recipestep.step;
			if (!step) return;

			// get the data from user
			var form = {
				id: this.recipestep._id,
				step: step
			}
			
			// update the recipe step
			API.updateRecipeStep(id, form)
				.success(function (data, status, headers, config) {
					// if successful, refresh to the recipe's details tab
					$scope.editRecipeStepTemplate.hide();
				})
				.error(function (data, status, headers, config) {
					// if error, notify error messages to user
					$rootScope.notify("Oops something went wrong!! Please try again later");
				});
		};
    })