(function () {
	'use strict';
	angular
		.module('app', [
			'ui.bootstrap', 
			'btford.socket-io',
			'uiGmapgoogle-maps',
			'ngRoute'
			])
		.config(function(uiGmapGoogleMapApiProvider){
    		uiGmapGoogleMapApiProvider.configure({
    			key: '<api_key>',
    			v: '3.17'
    		});
    	});
})();