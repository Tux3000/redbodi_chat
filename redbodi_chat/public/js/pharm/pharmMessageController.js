//TODO: merge this with user message controller
(function() {
	'use strict';
	angular
		.module('app')
		.controller('MsgCtrl', MessageController);

	function MessageController($rootScope, ioSocket){
		var vm = this;
		vm.sendMessage = function(convId){
			if(vm.msgToSend){
				ioSocket.emit('chatMessage', convId, vm.msgToSend);
				$rootScope.$emit('appendMessage',convId, "Pharmacist", vm.msgToSend);
				vm.msgToSend = null;
			}
		}
	}
})();