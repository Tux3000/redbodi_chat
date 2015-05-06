(function (){
	'use strict';
	angular
		.module('app')
		.controller('RegistrationCtrl', RegistrationController);

	function RegistrationController($http){
		var vm = this;	

		vm.register = function(pharmId){
			var pharmacist = {
				name: vm.name,
				email: vm.email,
				pharmId: pharmId,
				orgCode: vm.orgCode,
				password: vm.password,
				verification: vm.verification
			};
			$http.post('pharmRegister', pharmacist)
				.success(function(data){
					//TODO: redirect to the chat control panel
				})
				.error(function(data){
					//TODO: inform user that something went wrong
				});
		};
	}
})();