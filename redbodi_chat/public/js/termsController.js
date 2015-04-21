(function(){
	'use strict';
	angular
		.module('app')
		.controller('TermsCtrl', TermsController);

	function TermsController($modal){
        var vm = this;

		vm.hasAgreed = false;

        vm.openTerms = function(){
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl as modal',
                resolve:{
                    items: function(){
                        return vm.hasAgreed
                    }
                }
            });

            modalInstance.result.then(function(hasAgreed){
                vm.hasAgreed = hasAgreed;
            },function(){
                vm.hasAgreed = false;
            });
        };
	}

})();