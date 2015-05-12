(function(){
	'use strict';
	angular
		.module('app')
		.service('PharmacistService', PharmacistService);

	function PharmacistService($http) {
		var svc = this;
		svc.getPharmacist = function () {
			return $http.get('/api/pharmacists')
				.success(function (response) {
					return response;
				}).error(function (response) {
				});
		}

		svc.login = function (name, password) {
			return $http.post('/api/sessions', { name: name, password: password })
				.success(function (response) {
					window.localStorage.token = response;
					$http.defaults.headers.common['X-Auth'] = response;
					window.location.href = '#/';
					return svc.getPharmacist();
				}).error(function (response) { alert('error') });
		}

		svc.register = function (pharmacist) {
			$http.post('/api/pharmacists', pharmacist)
				.success(function (data) {
					return svc.login(pharmacist.name, pharmacist.password);
				})
				.error(function (data) { 
				});
		}
	}
})();


