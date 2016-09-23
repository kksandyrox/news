	// create the module and name it scotchApp
	var scotchApp = angular.module('scotchApp', ['ngRoute']);

	var API_URL = "server/api.php"

	var categories = {
		'technology' 	: 1,
		'general' 		: 2,
		'sports' 		: 3,
		'business' 		: 4,
		'entertainment' : 5,
		'gaming' 		: 6
	};
	// configure our routes
	scotchApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'homeController'
			})

			// route for the about page
			.when('/sources', {
				templateUrl : 'pages/sources.html',
				controller  : 'sourcesController'
			})
			.when('/:name', {
				templateUrl : 'pages/general.html',
				controller  : 'generalController',
			});

	});

	scotchApp.controller('generalController', function($scope, $http, $route) {
		function getCatIdFromName(categories, name) {
			return categories[name];

		}
		var category_id = getCatIdFromName(categories, $route.current.params.name);
		$http.get("http://news.sj/server/api/categoryNews/" + category_id)
		.then(function (response) {
			$scope.generalNews = response.data;
		});
	});

	scotchApp.controller('sourcesController', function($scope, $http) {
		$scope.test = 'Yes';
	});


	scotchApp.controller('aboutController', function($scope) {
		$scope.message = 'Look! I am an about page.';
	});


	scotchApp.controller('mainController', function($scope) {
		// $scope.message = 'Contact us! JK. This is just a demo.';
	});