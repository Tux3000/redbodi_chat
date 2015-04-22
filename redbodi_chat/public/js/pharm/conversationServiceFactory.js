(function() {
	'use strict';
	angular
		.module('app')
		.factory('conversationService', ConversationServiceFactory);
	function ConversationServiceFactory() {
		return { conversations: { } };
	}
})();