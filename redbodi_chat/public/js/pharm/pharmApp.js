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
		            .when('/', {
		                templateUrl : 'templates/pharmChat.html'
		            })
		            .when('/login', {
		                templateUrl : 'templates/login.html',
		                controller  : 'LoginCtrl'
		            })
		            .when('/register', {
		                templateUrl : 'templates/register.html',
		                controller  : 'RegistrationCtrl'
		            });

    	});
})();