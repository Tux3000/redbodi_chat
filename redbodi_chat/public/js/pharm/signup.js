(function(){
	'use strict';
	angular
		.module('app')
		.controller('SignupCtrl', SignUp);

	function SignUp(){
		var vm = this;
		vm.organisations =["What is your organisation code?", "abc", "def"];
		vm.orgCode = vm.organisations[0];
		/*vm.name;
		vm.email;
		vm.orgCode;*/
	}

})();