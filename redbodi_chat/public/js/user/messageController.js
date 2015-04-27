(function(){
    'use strict';
    angular
        .module('app')
        .controller('MsgCtrl', MessageController);

    
    function MessageController($rootScope, ioSocket, userNameService, momentService, msgOptionsService){
        var vm = this;
        vm.msgs = [];
        vm.alerts = [];
        vm.conversationId = null;


        function appendMessage(sender, message){
            vm.msgs.push({
                sender: sender,
                msg: message,
                time: momentService.format(),
                minutesAgo: 0,
                msgOptions: msgOptionsService.getOptions(userNameService.username === sender, sender.charAt(0))
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