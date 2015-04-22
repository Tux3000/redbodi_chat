(function() {
	'use strict';
	angular
		.module('app')
		.controller('LocCtrl', LocationController);

		function LocationController($rootScope, ioSocket){
            var vm = this;
            
            vm.determineError = function(error){
                var errorMsg = 'Unable to determine user location';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMsg = "User denied the request for Geolocation."
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMsg = "Location information is unavailable."
                        break;
                    case error.TIMEOUT:
                        errorMsg = "The request to get user location timed out."
                        break;
                    case error.UNKNOWN_ERROR:
                        errorMsg = "An unknown error occurred."
                        break;
                }
                vm.sendLocationToServer(null, null, errorMsg);
            }

            vm.getLocation = function(){
                if(navigator.geolocation){
                    navigator.geolocation.getCurrentPosition(vm.getPosition, vm.determineError);
                }else{
                    vm.sendLocationToServer(null, null, "User's browser does not support geolocation");
                }
            }

            vm.getPosition = function(position){
                vm.lat = position.coords.latitude;
                vm.lon = position.coords.longitude;
                vm.sendLocationToServer(position.coords.latitude, position.coords.longitude, 'Success');
            }

            vm.sendLocationToServer = function(lat, lon, message){
                ioSocket.emit('userLocation', lat, lon, message);
            }

            $rootScope.$on('startChat', function(eventName){
                vm.getLocation();
            });
        }
})();