(function () {
	'use strict';
	angular
		.module('app')
		.controller('ChatTabCtrl', ChatTabController);

	function ChatTabController($rootScope, conversationService, ioSocket) {
		var vm = this;
		vm.chats = {};

		$rootScope.$on('appendMessage', function(eventName, conversationId, sender, message){
			vm.appendMessage(conversationId, sender, message);
		});

		vm.appendMessage = function(conversationId, sender, message){

			if(!vm.chats[conversationId].chatSelected){
				vm.chats[conversationId].unreadMessages+=1;
			}

			var msgOptions={
				pullSide: 'left',
				oppositeSide: 'right',
				avatar: 'U',
				avatarColour: '55C1E7'
			};

			if(sender === 'Pharmacist'){
				msgOptions.pullSide = 'right';
                msgOptions.oppositeSide = 'left';
                msgOptions.avatar = 'P';
                msgOptions.avatarColour = 'FA6F57';
			}

			vm.chats[conversationId].messages.push({
				msg: message, 
				sender: sender,
				msgOptions: msgOptions
			});
		}
				
		vm.conversationSelected = function(conversationId){
			vm.chats[conversationId].unreadMessages = 0;
			vm.chats[conversationId].chatSelected = true;
		}

		vm.conversationDeselected = function(conversationId){
			vm.chats[conversationId].chatSelected = false;
		}
				
		ioSocket.on('chatMessage', function(conversation, message){
			vm.appendMessage(conversation.conversation, conversation.name, message);
		});

		ioSocket.on('joinedConversation', function(conversation){
			vm.chats[conversation.id] = { chatSelected: (vm.chats.length > 1 ? true : false), unreadMessages: 0, messages: [] };

			for(var i = 0; i < conversation.messages.length; i++){
            	var chat = conversation.messages[i];
            	vm.appendMessage(conversation.id, chat.sender, chat.msg);
        	}

			$rootScope.$broadcast('joinedConversation', conversation.id);
		});

	}
})();