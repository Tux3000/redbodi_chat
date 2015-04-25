(function () {
	'use strict';
	angular
		.module('app')
		.factory('msgOptionsService', MessageOptionsServiceFactory);

	function MessageOptionsServiceFactory() {
		function getOptions(isHost, userInitial) {
			var msgOptions = {
				pullSide: isHost ? 'right' : 'left',
				oppositeSide: isHost ? 'left' : 'right',
				avatar: userInitial,
				avatarColour: isHost ? '55C1E7' : 'FA6F57'
			};
			return msgOptions;
		}
		return { getOptions: getOptions };
	}
})();