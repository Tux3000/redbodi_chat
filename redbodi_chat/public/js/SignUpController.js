angular
	.module('app')
	.controller('ChatSignupCtrl', ChatSignupController)
	.controller('SignupCtrl', SignUpController);

function SignUpController($scope, $rootScope, ioSocketFactory, userNameServiceFactory) {
	alert('got here...');
	$scope.startChat = function(){
	    if($scope.name && $scope.firstMessage){
	        ioSocket.emit('startChat', $scope.name, $scope.firstMessage);
	        userNameService.username = $scope.name;
	        $scope.name = null;
	        $scope.firstMessage = null;
	    }
    }
}

function ChatSignupController($scope, $rootScope) {
	alert('got here 2');
	$scope.showSignup = true;
    $rootScope.$on('startChat', function(eventName){
        $scope.showSignup = false;
    });
}