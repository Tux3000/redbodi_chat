(function(){
	'use strict';
	angular
		.module('app')
		.controller('test', test);

	function test($rootScope) {
		var vm = this;
		vm.showSignup = true;
	    $rootScope.$on('startChat', function(eventName){
	        vm.showSignup = false;
	    });
		alert('got here 3');
	}
})();