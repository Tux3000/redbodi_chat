(function(){
	'use strict';
	angular
		.module('app')
		.controller('SignupCtrl', SignupController);

	function SignupController($scope, $rootScope, userNameService, ioSocket) {
		$scope.startChat = function(){
		    if($scope.name && $scope.firstMessage){
		        ioSocket.emit('startChat', $scope.name, $scope.firstMessage);
		        userNameService.username = $scope.name;
		        $scope.name = null;
		        $scope.firstMessage = null;
		    }
	    }
	}
})();