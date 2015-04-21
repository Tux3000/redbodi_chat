(function(){
	'use strict';
	angular
		.module('app')
		.controller('ViewCtrl', ViewController);

	function ViewController($rootScope, userNameService) {
		var vm = this;
		vm.showSignup = true;
	    $rootScope.$on('startChat', function(eventName){
	        vm.showSignup = false;
	    });
	}
})();