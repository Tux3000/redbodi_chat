(function(){
	'use strict';
	angular
		.module('app')
		.controller('LocCtrl', LocationController);

	function LocationController($scope, $rootScope, ioSocket, MarkerCreatorService) {
		$scope.latitude = 0;
		$scope.longitude = 0;
		$scope.statusMsg = 'N/A';

		$scope.grabLocation = function(conversationId){
			ioSocket.emit('getUserLocation', conversationId);					
		}

		ioSocket.on('userLocation', function(latitude, longitude, statusMsg){
			$scope.latitude = latitude;
			$scope.longitude = longitude;
			$scope.statusMsg = statusMsg;

			MarkerCreatorService.createByCoords(latitude, longitude, "User is here", function(marker){
				$scope.userMarker = marker;
			});

			$scope.map = { 
				center:{ 
					latitude: latitude, 
					longitude: longitude 
				}, 
				zoom: 12,
				markers: []
			};
			$scope.map.markers.push($scope.userMarker);
		});
	}
})();