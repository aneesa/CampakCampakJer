angular.module('CampakCampakJer', ['ionic', 'CampakCampakJer.controllers', 'CampakCampakJer.services'])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })
	// reroute urls, set controllers to pages/tabs
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('recipes', {
                url: "/recipes",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })
            .state('recipes.list', {
                url: '/list',
                views: {
                    'recipes-list': {
                        templateUrl: 'templates/tab-recipeslist.html',
                        controller: 'myRecipeListCtrl'
                    }
                }
            })
        $urlRouterProvider.otherwise('/recipes/list');
    });