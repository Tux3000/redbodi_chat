var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var uuid = require('node-uuid');
var Conversation = require('./conversation.js');

var people = {};
var conversations = {};
var clients = [];

app.use(express.static(__dirname + '/public'));
app.use('/components', express.static(__dirname + '/components'));
app.use('/js', express.static(__dirname + '/js'));

app.get('/', function(req, res){
  res.sendFile(__dirname +'/public/userChat.html');
});

app.get('/pharm', function(req, res){
	res.sendFile(__dirname + '/public/pharmChat.html');
});

app.get('/test', function(req, res){
	res.sendFile(__dirname + '/simpleChatUIDemo.html')
})

io.on('add pharmacist', function(client){
	client.emit('conversations', conversations);
});

io.on('connection', function(client){
	console.log('user has connected: ' + client.id);
	client.on('startChat', function(name, msg){
		console.log('startChat has been received');
		conversationId = null;
		people[client.id] = { "name" : name, "conversation" : conversationId }; //TODO check if user is already in conversation

		if(people[client.id].conversation === null){
			var id = uuid.v4();
			var conversation = new Conversation(name, id, client.id);
			conversations[id] = conversation;

			addUserToConversation(conversation, name, client);
			addMessageToConversation(conversation, client.id, msg);

			client.emit('chatStarted', true, conversation);
			client.broadcast.emit('conversationCreated', conversation);
			client.emit('update', 'You have joined a Conversation');

		} else {
			client.emit('update', 'You have already started a conversation.');
		}


	});
	
//requirement, only one pharmacist can join a conversation
	client.on('joinConversation', function(id, name){
		
		var conversation = conversations[id];
		
		if(client.id === conversation.owner || contains(conversation.people, client.id)){
			client.emit('update', 'You are already in this conversation');
		}else {
			if(addUserToConversation(conversation, name, client)){
				io.in(client.room).emit('update', name + ' has joined the conversation');
				client.emit('sendConversationId', {id:id});
				client.emit('joinedConversation', conversation);
			}else {
				client.emit('warning', 'Conversation by... '); //TODO: inform user of the name of pharmacist who has handled the chat
			}
			//TODO: broadcast to all pharm client to update their conversation list
		}
	});

	client.on('chatMessage', function(conversationId, message){
		console.log('message received: ' + message + ' from: ' + people[client.id].name);
		addMessageToConversation(conversations[conversationId], client.id, message);
		console.log(client.room);
		client.broadcast.to(client.room).emit('chatMessage', people[client.id], message);
	});

	client.on('closeConversation', function(){
		//only if the client is a pharmacist
	});

	client.on('disconnect', function(){

	});

});

http.listen(3000, function(){
	console.log('listening on *:3000');
});

function addMessageToConversation(conversation, clientId, message){
	conversation.addMessage(people[clientId].name, message);
}

function addUserToConversation(conversation, name, client){
// TODO: if the conversation has two people in it then return false otherwise:
	if(conversation.people.length === 2){
		return false;
	}else{
		people[client.id] = { "name" : name, "conversation" : conversation.id };
		people[client.id].conversation = conversation.id;
		conversation.addPerson(client.id);
		clients.push(client);
		client.room = conversation.name;
		client.join(client.room);
		
		console.log(name + ' has joined conversation: ' + conversation.id);
		return true;
	}
}

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}