//put the factories in a single file rather than split them
//if the factories start to contain more logic, then split them
angular
	.module('app')
	.factory('ioSocketFactory', ioSocketFactory)
	.factory('userNameServiceFactory', userNameServiceFactory);

function ioSocketFactory() {
	return socketFactory();
}

function userNameServiceFactory() {
	return { username: null };
}