(function(){
	'use strict';
	angular
		.module('app')
		.controller('TermsCtrl', TermsController);

	function TermsController($scope, $modal){
		$scope.hasAgreed = false;

        $scope.openTerms = function(){
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                resolve:{
                    items: function(){
                        return $scope.hasAgreed
                    }
                }
            });

            modalInstance.result.then(function(hasAgreed){
                $scope.hasAgreed = hasAgreed;
            },function(){
                $scope.hasAgreed = false;
            });
        };
	}

})();