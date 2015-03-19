//TODO: serialize or stick a partial of this class into a DB (mongo?) - must persist messages
function Conversation(name, id, owner){
	this.name = name;
	this.id = id;
	this.owner = owner;
	this.people = [];
	this.messages = [];
	this.status = "available";
};

Conversation.prototype.addPerson = function(personId) {
	if(this.status === "available"){
		this.people.push(personId);
	}
};

Conversation.prototype.addMessage = function(sender, message){
	this.messages.push({sender: sender, msg: message});
}

module.exports = Conversation;