(function () { 
	'use strict';
	angular
		.module('app')
		.directive('validChars', ValidChars);

	function ValidChars() {
		return {
			require: 'ngModel',
			link: function(scope, elem, attrs, ctrl) {
				scope.$watch(attrs.ngModel, function(value){
					ctrl.$setValidity('invalidChars', true);

					if(!value) {
						return;
					}

					if(value !== encodeURIComponent(value)) {
						ctrl.$setValidity('invalidChars', false);
					}
				});
				
			}
		}
	}

})();