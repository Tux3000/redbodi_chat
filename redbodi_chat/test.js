var app = require('express')();
var http = require('http').Server(app);
var io = require("socket.io")(http);  
var Conversation = require('./conversation.js');  
var uuid = require('node-uuid');


http.listen(3000, function(){
  console.log('listening on *:3000');
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});





//socket.set("log level", 1);  
var people = {};  
var rooms = {};  
var clients = [];  

io.on("connection", function (client) {  
	//console.log('got this far');
	//console.log(io.rooms['myconversation']); //should return { '': true }  
	//client.conversation = ' myconversation';  
	client.room = 'room1';
	client.join('room1');  
	//io.to('myconversation').emit('chat message', 'hello dude');
	console.log(client.room);
});