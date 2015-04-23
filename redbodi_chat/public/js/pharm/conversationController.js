(function () {
	'use strict';
	angular
		.module('app')
		.controller('ConvsCtrl', ConversationController);

	function ConversationController($rootScope, conversationService, ioSocket) {
		var vm = this;
		vm.convs = [];

		vm.joinConversation = function(conversationId){
			ioSocket.emit('joinConversation', conversationId, 'Pharmacist'); // name to come from session
		}

		function addConversation (conversation){
			
			vm.convs.push({
				name: conversation.name,
				firstMessage: conversation.messages[0].msg,
				id: conversation.id,
				dateTime: Date.now()
			});
			conversationService.conversations[conversation.id] = conversation;
		}

		function removeConversation(index){
			vm.convs.splice(index, 1);
		}
		
		$rootScope.$on('joinedConversation', function(eventName, conversationId){
			for(var index = 0; index < vm.convs.length; ++index){
				if(vm.convs[index].id === conversationId){
					removeConversation(index);
				}
			}
		});
		
		ioSocket.emit('pharmacistListener');

		ioSocket.on('conversationAnswered', function(conversationId){ //answered by another pharmacist
			removeConversation(vm.convs.indexOf(conversationId));
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