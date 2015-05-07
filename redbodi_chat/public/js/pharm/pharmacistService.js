(function(){
	'use strict';
	angular
		.module('app')
		.service('PharmacistService', PharmacistService);

	function PharmacistService($http) {
		var svc = this;
		svc.getUser = function () {
			return $http.get('/api/pharmacists')
				.then(function (response) {
					return response.data;
				});
		}

		svc.login = function (name, password) {
			return $http.post('/api/sessions', { name: name, password: password })
				.then(function (response) {
					svc.token = response.data;
					$http.defaults.headers.common['X-Auth'] = response.data;
					//TODO: redirect to chat control panel
					//TODO: save the jwt in window.localsStorage.token
					return svc.getUser();
				});
		}

		svc.register = function (pharmacist) {
			alert('test');
			$http.post('/api/pharmacists', pharmacist)
				.success(function (data) {
					svc.login(pharmacist.name, pharmacist.password);
				})
				.error(function (data){});
		}
	}
})();


