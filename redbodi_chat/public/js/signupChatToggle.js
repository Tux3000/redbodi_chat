(function(){
	'use strict';
	angular
		.module('app')
		.controller('ChatSignupCtrl', ChatSignupController);

	function ChatSignupController($scope, $rootScope, userNameService) {
		$scope.showSignup = true;
	    $rootScope.$on('startChat', function(eventName){
	        $scope.showSignup = false;
	    });
	}
})();