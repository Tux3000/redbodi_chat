(function () {
	'use strict';
	angular
		.module('app')
		.directive('validOrg', ['$http', ValidOrganisation]);

	function ValidOrganisation($http) {
		var directive = {
			require: 'ngModel',
			link: function(scope, elem, attrs, ctrl) {
				scope.busy = false;
				scope.$watch(attrs.ngModel, function(value) {
					ctrl.$setValidity('validOrg', true);

					if(!value) {
						return;
					}
					scope.busy = true;
					$http.post('/pharm/check/organisation', {orgCode: value})
						.success(function (data) {
							scope.busy = false;
							scope.name = data.Name;
							scope.address1 = data.Address1;
							scope.address2 = data.Address2;
							scope.address3 = data.Address3;
							scope.postCode = data.PostCode;
							scope.orgCode = data._id;
						}).error(function (data) {
							if(data.invalidOrg){
								ctrl.$setValidity('validOrg', false);
								scope.busy = false;
							}
						});
				});
			}
		}
		return directive;
	}

	function CheckOrganisationCode(scope, el, attr, ctrl) {

	}
})();