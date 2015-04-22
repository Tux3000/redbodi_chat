//TODO: merge common functionality with pharmMessageController.js
(function(){
    'use strict';
    angular
        .module('app')
        .controller('MsgCtrl', MessageController);

    
    function MessageController($rootScope, ioSocket, userNameService){
        var vm = this;
        vm.msgs = [];
        vm.alerts = [];
        vm.conversationId = null;

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

            vm.msgs.push({
                sender: sender,
                msg: message,
                msgOptions: msgOptions
            });
        }

        vm.closeAlert = function(index){
            vm.alerts.splice(index, 1);
        };

        vm.sendMessage = function(){
            if(vm.msgToSend){
                ioSocket.emit('chatMessage', vm.conversationId, vm.msgToSend);
                appendMessage(userNameService.username, vm.msgToSend);
                vm.msgToSend = null;
            }
        }

        $rootScope.$on('firstMessage', function(eventName, conversation){
            for(var i = 0; i < conversation.messages.length; i++){
                var chat = conversation.messages[i];
                appendMessage(chat.sender, chat.msg);
            }
        });

        ioSocket.on('chatMessage', function(sender, message){
            appendMessage(sender.name, message);
        });

        ioSocket.on('update', function(status){
            vm.alerts.push({type: 'success', msg: status});
        });

        ioSocket.on('chatStarted', function(hasStrarted, conversation){
            if(hasStrarted){
                vm.alerts.push({type: 'success', msg: 'Conversation created'});
                $rootScope.$broadcast('startChat');
                $rootScope.$broadcast('firstMessage',  conversation);
                vm.conversationId = conversation.id;
            }
        });

	}

})();