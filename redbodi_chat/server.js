var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var uuid = require('node-uuid');
var Conversation = require('./conversation.js');

var people = {};
var conversations = {};
var clients = [];


app.get('/', function(req, res){
  res.sendFile(__dirname + '/userChat.html');
});

app.get('/pharm', function(req, res){
	res.sendFile(__dirname + '/pharmChat.html');
});


io.on('connection', function(client){
	console.log('user has connected: ' + client.id);
	client.on('startChat', function(name, msg){
		console.log('startChat has been received');
		conversationId = null;
		people[client.id] = { "name" : name, "convesation" : conversationId };
		
		//io.socekts.emit('update-people', people);
		// not sure needed client.emit('conversationList', {conversations: conversations})
		clients.push(client);

		if(people[client.id].convesation === null){
			var id = uuid.v4();
			var conversation = new Conversation(name, id, client.id);
			conversations[id] = conversation;
			//socket.sockets.emit('conversationList' { conversations: conversations })
			client.room = name;
			client.join(client.room);

			conversation.addPerson(client.id);
			people[client.id].inRoom = id;

			client.emit('chatStarted', true);
			client.broadcast.emit('conversationCreated', {"name" : name, "message" : msg, "conversationId" : id});
			client.emit('update', 'You have joined a Conversation');

		} else {
			socket.sockets.emit('update', 'You have already started a conversation.');
		}


	});

	client.on('joinConversation', function(id, name){
		
		var conversation = conversations[id];
		
		if(client.id === conversation.owner || contains(conversation.people, client.id)){
			client.emit('update', 'You are already in this conversation');
		}else {
			people[client.id] = {"name" : name, "conversation" : id};
			console.log('user joined conversation: ' + id);
			conversation.addPerson(client.id);
			people[client.id].inRoom = id;
			client.room = conversation.name;
			client.join(client.room);
			io.in(client.conversation).emit('update', name + ' has joined the conversation');
			client.emit('sendConversationId', {id:id});
		}
	});

	client.on('chatMessage', function(message){
		console.log('message received: ' + message);
		//var person = people[client.id];
		console.log(client.room);
		client.broadcast.to(client.room).emit('chatMessage', people[client.id], message);
	});

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}