(function (){
	'use strict';
	angular
		.module('app')
		.controller('LoginCtrl', LoginController);

	function LoginController(PharmacistService){
		var vm = this;
		vm.login = function (){
			PharmacistService.login(vm.name, vm.password);
		}
	}
})();