(function() {
	'use strict';
	angular
		.module('app')
		.factory('userNameService', UserNameServiceFactory);
	function UserNameServiceFactory() {
		return { username: null };
	}

})();