(function (){
	'use strict';
	angular
		.module('app')
		.controller('RegistrationCtrl', RegistrationController);

	function RegistrationController(ioSocket){
		var vm = this;	
		vm.organisations =["What is your organisation code?", "abc", "def"];
		vm.orgCode = vm.organisations[0];
		vm.alerts = [];

		vm.errorAlert = function(msg) {
			vm.closeAlert(0);
			vm.alerts.push({ msg: msg, type: 'danger' });
		};

		vm.closeAlert = function(index) {
			vm.alerts.splice(index, 1);
		};

		vm.register = function(){
			if(vm.password !== vm.passwordConfirm){
				vm.errorAlert('Passwords do not match');
			}

			var pharmacist = {
								name: vm.name, 
								email: vm.email,
								orgCode: vm.orgCode,
								password: vm.password
							};
		};

		vm.usernameSupplied = function(){
			if(vm.name){
				ioSocket.emit('checkUsername', vm.name);
			}
		}

		ioSocket.on('usernameTaken', function(name){
			vm.errorAlert(name + " is already taken");
		});
	}
})();