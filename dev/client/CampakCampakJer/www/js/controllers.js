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
			
			// hide any indicators
            $rootScope.hide();
        }).error(function (data, status, headers, config) {
			// if error, hide any indicators and notify error message to users
            $rootScope.hide();
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
            $rootScope.show();
            
            $rootScope.show("Please wait... Creating new");

			// get the data from user
            var form = {
                name: name,
                step: step,
                created: Date.now(),
                updated: Date.now()
            }

			// save the recipe
            API.saveRecipe(form)
                .success(function (data, status, headers, config) {
					// if successful, hide any indicators and refresh to the recipe's details tab
                    $rootScope.hide();
                    $rootScope.doRefresh(1);
                })
                .error(function (data, status, headers, config) {
					// if error, hide any indicators and notify error messages to user
                    $rootScope.hide();
                    $rootScope.notify("Oops something went wrong!! Please try again later");
                });
        };
    })