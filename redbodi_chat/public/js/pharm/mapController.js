(function(){
	'use strict';
	angular
		.module('app')
		.controller('LocCtrl', LocationController);

	function LocationController($rootScope, ioSocket, MarkerCreatorService) {
		var vm = this;
		vm.latitude = 0;
		vm.longitude = 0;
		vm.statusMsg = 'N/A';

		vm.grabLocation = function(conversationId){
			ioSocket.emit('getUserLocation', conversationId);					
		}

		ioSocket.on('userLocation', function(latitude, longitude, statusMsg){
			vm.latitude = latitude;
			vm.longitude = longitude;
			vm.statusMsg = statusMsg;
			vm.map = { 
				center:{ 
					latitude: latitude, 
					longitude: longitude 
				}, 
				zoom: 12,
				markers: []
			};

			MarkerCreatorService.createByCoords(latitude, longitude, "User is here", function(marker){
				vm.userMarker = marker;
			});

			vm.map.markers.push(vm.userMarker);
		});
	}
})();