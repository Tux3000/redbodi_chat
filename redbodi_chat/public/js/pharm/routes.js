(function(){
	'use strict';
	angular
		.module('app')
		.config(config);
	function config($routeProvider){
		$routeProvider
			.when('/asdf', {
				templateUrl: 'asdf.html',
				controller: 'asdf',
				controllerAs: 'vm'
			});
	}

})();