(function(){
	'use strict';
	angular
		.module('app')
		.controller('ModalInstanceCtrl', ModalController);

	function ModalController(){
		$scope.agreed = false;

        $scope.agree = function($scope, $modalInstance){
            $scope.agreed = true;
            $modalInstance.close($scope.agreed);
        };

        $scope.cancel = function(){
            $modalInstance.dismiss('cancel');
        };
	}

})();