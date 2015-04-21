//put the factories in a single file rather than split them
//if the factories start to contain more logic, then split them
(function(){
	angular
		.module('app')
		.factory('ioSocket', IoSocketFactory)
		.factory('userNameService', UserNameServiceFactory);

	function IoSocketFactory(socketFactory) {
		var socket = socketFactory();
		return socket;
	}

	function UserNameServiceFactory() {
		return { username: null };
	}
})();