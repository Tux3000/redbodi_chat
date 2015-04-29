(function () {
	'use strict';
	angular
		.module('app', [
			'ui.bootstrap',
			'btford.socket-io',
			'uiGmapgoogle-maps',
			'ngRoute'
			])
		.config(function(uiGmapGoogleMapApiProvider, $routeProvider){
    		uiGmapGoogleMapApiProvider.configure({
    			key: '<api_key>',
    			v: '3.17'
    		});
    		$routeProvider

		            // route for the home page
		            .when('/', {
		                templateUrl : 'templates/pharmChat.html',
		                controller  : 'ConvsCtrl'
		            })

		            // route for the about page
		            .when('/login', {
		                templateUrl : 'templates/login.html',
		                controller  : 'LoginCtrl'
		            })

		            // route for the contact page
		            .when('/register', {
		                templateUrl : 'templates/register.html',
		                controller  : 'RegistrationCtrl'
		            });

    	});
})();