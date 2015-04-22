(function(){
	'use strict';
	angular
		.module('app')
		.factory('MarkerCreatorService', MarkerCreatorServiceFactory);
	function MarkerCreatorServiceFactory() {
		var markerId = 0;
		function create(latitude, longitude, message){
			var marker = {
				options: {
					animation: 0,
				},
				coords: {
					latitude: latitude,
					longitude: longitude
				},
				id: ++markerId,
				title: message,
				show: false
			};
			marker.onClick = function(){
				marker.show = !marker.show;
			};
			return marker;
		}

		function invokeSuccessCallback(successCallback, marker) {
	        if (typeof successCallback === 'function') {
	            successCallback(marker);
	        }
	    }

		function createByCoords(latitude, longitude, message, successCallback){
			var marker = create(latitude, longitude, message);
			invokeSuccessCallback(successCallback, marker);
		}

		return { createByCoords: createByCoords };
	}
})();