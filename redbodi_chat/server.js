//TODO: refactor split out responsibilities - auth, routes and chat
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var uuid = require('node-uuid');
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');
var Conversation = require('./conversation.js');
var Pharmacist = require('./models/pharmacist');
var Pharmacy = require('./models/pharmacy');
app.use(require('body-parser').json());
app.use(require('./auth'));

var people = {};
var conversations = {};
var clients = [];
var queuedConversations = [];

app.use(express.static(__dirname + '/public'));
app.use('/components', express.static(__dirname + '/components'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/api/sessions', require('./controllers/api/sessions'));
app.use('/api/pharmacists', require('./controllers/api/pharmacists'));

app.get('/test', function (req, res) { 
	res.sendFile(__dirname + '/test.html')
});

app.get('/', function (req, res){
  res.sendFile(__dirname +'/public/userChat.html');
});

app.get('/pharm', function (req, res){
	res.sendFile(__dirname + '/public/pharm.html');
	
});

app.post('/pharmacies', function (req, res) {
	Pharmacy.find({ loc: { $near: { $geometry: {type: 'Point', coordinates: [ req.body.lat, req.body.long ] }, $maxDistance: 5000 } } })
		.select('Name')
		.select('Address1')
		.select('Address2')
		.select('Address3')
		.select('Address4')
		.select('PostCode')
		.select('Tel')
		.select('loc')
		.limit(5)
		.exec(function (err, pharmacies) {
			if(err){
				console.log(err);
				return next(err);
			}
			if(!pharmacies){
				return res.status(403);
			}
			return res.status(200).json(pharmacies)
		});
});

app.post('/pharm/check/organisation', function (req, res) {
	Pharmacy.findOne({OrgCode: req.body.orgCode})
			.select('Name')
			.select('Address1')
			.select('Address2')
			.select('Address3')
			.select('PostCode')
			.exec(function (err, pharmacy){
				if(err) { 
					return next(err);
				}
				if(!pharmacy) {
					return res.status(403).json({invalidOrg: true});
				}
				pharmacy.invalidOrg = false;
				return res.status(200).json(pharmacy);
			});
});

io.on('connection', function (client) {
	console.log('user has connected: ' + client.id);

	client.on('pharmacistListener', function () {
		console.log('pharm added...');
		client.emit('conversations', queuedConversations);
	});

	client.on('startChat', function (name, msg) {
		console.log('startChat has been received');
		conversationId = null;
		people[client.id] = { "name" : name, "conversation" : conversationId }; //TODO check if user is already in conversation

		if(people[client.id].conversation === null){
			var id = uuid.v4();
			var conversation = new Conversation(name, id, client.id);
			conversations[id] = conversation;
			queuedConversations.push(conversation);

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
	client.on('joinConversation', function (id, name) {
		
		var conversation = conversations[id];
		


		if(client.id === conversation.owner || contains(conversation.people, client.id)){
			client.emit('update', 'You are already in this conversation');
		}else {
			if(addUserToConversation(conversation, name, client)){
				io.in(id).emit('update', name + ' has joined the conversation');
				client.emit('sendConversationId', {id:id});
				client.emit('joinedConversation', conversation);
				//remove conversation from queue
				queuedConversations.splice(queuedConversations.indexOf(conversation), 1);
				client.broadcast.emit('conversationAnswered', conversation);

			}else {
				client.emit('warning', 'Conversation by... '); //TODO: inform user of the name of pharmacist who has handled the chat
			}
			//TODO: broadcast to all pharm client to update their conversation list
		}
	});

	client.on('chatMessage', function (conversationId, message) {
		console.log('message received: ' + message + ' from: ' + people[client.id].name);
		addMessageToConversation(conversations[conversationId], client.id, message);
		console.log('room: ' + conversationId);
		
		client.broadcast.to(conversationId).emit('chatMessage', people[client.id], message);
	});

	client.on('userLocation', function(latitude, longitude, statusMsg) {
		console.log('User location: lat:' + latitude + ' lon:' + longitude +' status: ' + statusMsg);		
		//set the person's location
		people[client.id].latitude = latitude;
		people[client.id].longitude = longitude;
		people[client.id].locationStatusMsg = statusMsg;

	});

	client.on('getUserLocation', function (conversationId) {
		var user = people[conversations[conversationId].people[0]]; //user is always first one in the list. Can I always count on this asumption? Probably not...
		client.emit('userLocation', user.latitude, user.longitude, user.locationStatusMsg);
		//TODO: look up nearest pharmacy to user
			//send list of nearby pharmacies to pharmacist connected to conversation
			//would it also be useful to send that list to the user?
	})

	client.on('closeConversation', function() {
		//only if the client is a pharmacist
	});

	client.on('disconnect', function() {

	});

});

http.listen(4000, function(){
	console.log('listening on *:4000');
});

function addMessageToConversation (conversation, clientId, message) {
	conversation.addMessage(people[clientId].name, message);
}

function addUserToConversation (conversation, name, client) {
// TODO: if the conversation has two people in it then return false otherwise:
	if(conversation.people.length === 2){
		return false;
	}else{
		people[client.id] = { "name" : name, "conversation" : conversation.id };
		people[client.id].conversation = conversation.id;
		conversation.addPerson(client.id);
		clients.push(client);
		//client.room = conversation.id;
		client.join(conversation.id);
		
		console.log(name + ' has joined conversation: ' + conversation.id);
		return true;
	}
}

function contains (a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}