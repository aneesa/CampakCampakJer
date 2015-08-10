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

	// TODO: save this as an example to be used for recipe steps
    $scope.deleteItem = function (id) {
        $rootScope.show("Please wait... Deleting from List");
        API.deleteItem(id, $rootScope.getToken())
            .success(function (data, status, headers, config) {
                $rootScope.hide();
                $rootScope.doRefresh(1);
            }).error(function (data, status, headers, config) {
                $rootScope.hide();
                $rootScope.notify("Oops something went wrong!! Please try again later");
            });
    };

})

// controller for slide-newrecipe.html
.controller('myNewRecipeCtrl', function ($rootScope, $scope, API, $window) {

		// reset the new recipe
        $scope.recipe = {
	        name: "",
			step: ""
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

    $rootScope.$broadcast('fetchDetails');

	// TODO: save this as an example to be used for recipe steps
    $scope.deleteItem = function (id) {
        $rootScope.show("Please wait... Deleting from List");
        API.deleteItem(id, $rootScope.getToken())
            .success(function (data, status, headers, config) {
                $rootScope.hide();
                $rootScope.doRefresh(1);
            }).error(function (data, status, headers, config) {
                $rootScope.hide();
                $rootScope.notify("Oops something went wrong!! Please try again later");
            });
    };

})