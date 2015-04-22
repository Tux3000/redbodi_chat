(function(){
	'use strict';
	angular
		.module('app')
		.controller('SignupCtrl', SignupController);

	function SignupController($rootScope, userNameService, ioSocket) {
		var vm = this;
		vm.startChat = function(){
		    if(vm.name && vm.firstMessage){
		        ioSocket.emit('startChat', vm.name, vm.firstMessage);
		        userNameService.username = vm.name;
		        vm.name = null;
		        vm.firstMessage = null;
		    }
	    }
	}
})();