(function (){
	'use strict';
	angular
		.module('app')
		.controller('RegistrationCtrl', RegistrationController);

	function RegistrationController(PharmacistService, $scope, $window){
		var vm = this;	

		vm.register = function(orgId){
			var pharmacist = {
				name: vm.name,
				email: vm.email,
				orgId: orgId,
				orgCode: vm.orgCode,
				password: vm.password,
				verification: vm.verification
			};
			PharmacistService.register(pharmacist);
		};
	}
})();