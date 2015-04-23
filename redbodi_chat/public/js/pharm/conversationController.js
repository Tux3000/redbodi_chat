(function () {
	'use strict';
	angular
		.module('app')
		.controller('ConvsCtrl', ConversationController);

	function ConversationController($scope, $rootScope, conversationService, ioSocket) {
		$scope.convs = [];

		function addConversation (conversation){
			
			$scope.convs.push({
				name: conversation.name,
				firstMessage: conversation.messages[0].msg,
				id: conversation.id
			});
			conversationService.conversations[conversation.id] = conversation;
		}
		
		$scope.joinConversation = function(conversationId){
			ioSocket.emit('joinConversation', conversationId, 'Pharmacist'); // name to come from session
		}

		function removeConversation(index){
			alert('remove @' + index);
			$scope.convs.splice(index, 1);
		}
		
		$rootScope.$on('joinedConversation', function(eventName, conversationId){
			for(var index = 0; index < $scope.convs.length; ++index){
				if($scope.convs[index].id === conversationId){
					removeConversation(index);
				}
			}
		});
		
		ioSocket.emit('pharmacistListener');

		ioSocket.on('conversationAnswered', function(conversationId){ //answered by another pharmacist
			removeConversation($scope.convs.indexOf(conversationId));
		});

		ioSocket.on('conversationCreated', function(conversation){
			addConversation(conversation);
		});

		ioSocket.on('conversations', function(conversations){
			for (var i = 0; i< conversations.length; i++){
				addConversation(conversations[i]);
			}
		});
	}
})();