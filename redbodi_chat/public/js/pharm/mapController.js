(function(){
	'use strict';
	angular
		.module('app')
		.controller('LocCtrl', LocationController);

	function LocationController ($rootScope, ioSocket, MarkerCreatorService, $http) {
		var vm = this;
		vm.latitude = 0;
		vm.longitude = 0;
		vm.statusMsg = 'N/A';

		vm.grabLocation = function (conversationId){
			ioSocket.emit('getUserLocation', conversationId);					
		}

		vm.getPharmacies = function (lat, long) {
			$http.post('/pharmacies', { lat: lat, long: long})
				.success(function (pharmacies){
					//TODO: refactor into method
					for(var i = 0; i < pharmacies.length; i++) {
						var pharmacy = pharmacies[i];
						var message = 'Name: ' + pharmacy.Name + ' Address:' + pharmacy.Address1 + ', ' + pharmacy.PostCode + ' Tel:' + pharmacy.Tel;
						var pharmMaker = vm.createMarker(pharmacy.loc.coordinates[0], pharmacy.loc.coordinates[1], message);
						vm.map.markers.push(pharmMaker);
					}
				})
				.error(function (data) {
					alert('something went wrong'); //TODO: better error handling
				});
		}

		vm.createMarker = function (latitude, longitude, message){
			var tempMarker = null;
			MarkerCreatorService.createByCoords(latitude, longitude, message, function (marker){
				tempMarker = marker;
			});

			return tempMarker;
		}

		ioSocket.on('userLocation', function (latitude, longitude, statusMsg){
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

			vm.userMarker = vm.createMarker(latitude, longitude, 'User is here');
			vm.map.markers.push(vm.userMarker);
			vm.getPharmacies(vm.latitude, vm.longitude);
		});
	}
})();