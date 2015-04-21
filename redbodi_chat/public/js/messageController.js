(function(){
	'use strict';
	angular
		.module('app')
		.controller('MsgCtrl', MessageController);

	function MessageController($scope, $rootScope, ioSocket, userNameService){
		$scope.msgs = [];
        $scope.alerts = [];
        $scope.conversationId = null;

        $rootScope.$on('firstMessage', function(eventName, conversation){
            for(var i = 0; i < conversation.messages.length; i++){
                var chat = conversation.messages[i];
                appendMessage(chat.sender, chat.msg);
            }
        });

        $scope.sendMessage = function(){
            if($scope.msgToSend){
                ioSocket.emit('chatMessage', $scope.conversationId, $scope.msgToSend);
                appendMessage(userNameService.username, $scope.msgToSend);
                $scope.msgToSend = null;
            }
        }

        $scope.closeAlert = function(index){
            $scope.alerts.splice(index, 1);
        };

        ioSocket.on('chatMessage', function(sender, message){
            appendMessage(sender.name, message);
        });

        ioSocket.on('update', function(status){
            $scope.alerts.push({type: 'success', msg: status});
        });

        ioSocket.on('chatStarted', function(hasStrarted, conversation){
            if(hasStrarted){
                $scope.alerts.push({type: 'success', msg: 'Conversation created'});
                $rootScope.$broadcast('startChat');
                $rootScope.$broadcast('firstMessage',  conversation);
                $scope.conversationId = conversation.id;
            }
        });

        function appendMessage(sender, message){
            var msgOptions = {
                pullSide: 'left',
                oppositeSide: 'right',
                avatar: 'P',
                avatarColour: 'FA6F57'
            }; 

            if(userNameService.username === sender){
                msgOptions.pullSide = 'right';
                msgOptions.oppositeSide = 'left';
                msgOptions.avatar = 'U';
                msgOptions.avatarColour = '55C1E7';
            }

            $scope.msgs.push({
                sender: sender,
                msg: message,
                msgOptions: msgOptions
            });
        }
	}

})();