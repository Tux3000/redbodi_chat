(function(){
	'use strict';
	angular
		.module('app')
		.controller('ModalInstanceCtrl', ModalController);

	function ModalController(){
		var vm = this;
		
		vm.agreed = false;

        vm.agree = function($modalInstance){
            vm.agreed = true;
            $modalInstance.close(vm.agreed);
        };

        vm.cancel = function(){
            $modalInstance.dismiss('cancel');
        };
	}

})();