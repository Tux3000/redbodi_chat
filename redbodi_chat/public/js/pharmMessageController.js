//TODO: merge this with user message controller
(function() {
	'use strict';
	angular
		.module('app')
		.controller('MsgCtrl', MessageController);

	function MessageController($scope, $rootScope, conversationService, ioSocket){
		$scope.sendMessage = function(convId){
			if($scope.msgToSend){
				ioSocket.emit('chatMessage', convId, $scope.msgToSend);
				$scope.appendMessage(convId, "Pharmacist", $scope.msgToSend);
				$scope.msgToSend = null;
			}
		}
	}
})();