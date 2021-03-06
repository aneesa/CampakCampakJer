angular.module('CampakCampakJer.services', [])
    .factory('API', function ($rootScope, $http, $ionicLoading, $window) {
		var base = "http://campakcampakjer-ailuromaniac.rhcloud.com";
		
		// show loading indicator
        $rootScope.show = function (text) {
            $rootScope.loading = $ionicLoading.show({
                content: text ? text : 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
        };

		// hide loading indicator
        $rootScope.hide = function () {
            $ionicLoading.hide();
        };

		// notify user
        $rootScope.notify = function(text){
            $rootScope.show(text);
            $window.setTimeout(function () {
              $rootScope.hide();
            }, 1999);
        };

		// refresh to the correct pages/tabs
        $rootScope.doRefresh = function (tab) {
            if(tab == 1)
                $rootScope.$broadcast('fetchAll');
            else
                $rootScope.$broadcast('fetchDetails');
            
            $rootScope.$broadcast('scroll.refreshComplete');
        };

        return {
			// get all recipes from API
            getAllRecipes: function () {
                return $http.get(base+'/api/campakcampakjer/recipes', {
                    method: 'GET'
                });
            },
			
			// get a recipe by id from API
            getOneRecipe: function (id) {
                return $http.get(base+'/api/campakcampakjer/recipe/' + id, {
                    method: 'GET'
                });
            },
			
			// save new recipe to API
            saveRecipe: function (form) {
                return $http.post(base+'/api/campakcampakjer/recipe', form, {
                    method: 'POST'
                });
            },
			
			// delete a recipe from API
            deleteRecipe: function (id) {
                return $http.delete(base+'/api/campakcampakjer/recipe/' + id, {
                    method: 'DELETE'
                });
            },
			
			// update an existing recipe to API
            updateRecipe: function (id, form) {
                return $http.put(base+'/api/campakcampakjer/recipe/' + id, form, {
                    method: 'PUT'
                });
            },
			
			// save a new recipe's step to API
            saveRecipeStep: function (form) {
                return $http.post(base+'/api/campakcampakjer/recipestep', form, {
                    method: 'POST'
                });
            },
			
			// delete a recipe's step from API
            deleteRecipeStep: function (recipeId, id) {
                return $http.delete(base+'/api/campakcampakjer/recipestep/' + recipeId + '/' + id, {
                    method: 'DELETE'
                });
            },
			
			// update an existing recipe step to API
            updateRecipeStep: function (id, form) {
                return $http.put(base+'/api/campakcampakjer/recipestep/' + id, form, {
                    method: 'PUT'
                });
            },
        }
    });
