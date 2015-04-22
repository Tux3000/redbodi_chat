(function(){
	'use strict';
	angular
		.module('app')
		.factory('ioSocket', IoSocketFactory);

	function IoSocketFactory(socketFactory) {
		return socketFactory();
	}
})();