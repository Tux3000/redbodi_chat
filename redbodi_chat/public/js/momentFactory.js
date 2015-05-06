(function(){
	'use strict';
	angular
		.module('app')
		.factory('momentService', MomentFactory);

	function MomentFactory() {
		return moment();
	}
})();


