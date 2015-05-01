(function (){
	'use strict';
	angular
		.module('app')
		.controller('LoginCtrl', LoginController);

	function LoginController(){
		var vm = this;

		this.login = function(){
			alert('you pressed login');
		};
	}
})();