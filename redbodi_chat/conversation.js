function Conversation(name, id, owner, firstMessage){
	this.name = name;
	this.id = id;
	this.owner = owner;
	this.people = [];
	this.firstMessage = firstMessage;
	this.status = "available";
};

Conversation.prototype.addPerson = function(personId) {
	if(this.status === "available"){
		this.people.push(personId);
	}
};

module.exports = Conversation;