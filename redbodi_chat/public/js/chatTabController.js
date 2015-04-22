(function () {
	'use strict';
	angular
		.module('app')
		.controller('ChatTabCtrl', ChatTabController);

	function ChatTabController($scope, $rootScope, conversationService, ioSocket) {
		$scope.chats = {};

		$scope.appendMessage = function(conversationId, sender, message){
			

			if(!$scope.chats[conversationId].chatSelected){
				$scope.chats[conversationId].unreadMessages+=1;
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

			$scope.chats[conversationId].messages.push({
				msg: message, 
				sender: sender,
				msgOptions: msgOptions
			});
		}
				
		$scope.conversationSelected = function(conversationId){
			$scope.chats[conversationId].unreadMessages = 0;
			$scope.chats[conversationId].chatSelected = true;
		}

		$scope.conversationDeselected = function(conversationId){
			$scope.chats[conversationId].chatSelected = false;
		}
				
		ioSocket.on('chatMessage', function(conversation, message){
			
			$scope.appendMessage(conversation.conversation, conversation.name, message);
		});

		ioSocket.on('joinedConversation', function(conversation){
			$scope.chats[conversation.id] = { chatSelected: ($scope.chats.length > 1 ? true : false), unreadMessages: 0, messages: [] };

			for(var i = 0; i < conversation.messages.length; i++){
            	var chat = conversation.messages[i];
            	$scope.appendMessage(conversation.id, chat.sender, chat.msg);
        	}

			$rootScope.$broadcast('joinedConversation', conversation.id);
		});

	}
})();