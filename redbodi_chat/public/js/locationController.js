(function() {
	'use strict';
	angular
		.module('app')
		.controller('LocCtrl', LocationController);

		function LocationController($scope, $rootScope, ioSocket){
            $scope.getPosition = function(position){
                $scope.lat = position.coords.latitude;
                $scope.lon = position.coords.longitude;
                $scope.sendLocationToServer(position.coords.latitude, position.coords.longitude, 'Success');
            }

            $scope.determineError = function(error){
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
                $scope.sendLocationToServer(null, null, errorMsg);
            }

            $scope.getLocation = function(){
                if(navigator.geolocation){
                    navigator.geolocation.getCurrentPosition($scope.getPosition, $scope.determineError);
                }else{
                    $scope.sendLocationToServer(null, null, "User's browser does not support geolocation");
                }
            }

            $scope.sendLocationToServer = function(lat, lon, message){
                ioSocket.emit('userLocation', lat, lon, message);
            }

            $rootScope.$on('startChat', function(eventName){
                $scope.getLocation();
            });
		}
})();