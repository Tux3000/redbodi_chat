function Conversation(name, id, owner, firstMessage){
	this.name = name;
	this.id = id;
	this.owner = owner;
	this.people = [];
	this.firstMessage = firstMessage; //is it the responsibility of Conversation to know the first message?? - probably not...
	this.status = "available";
};

Conversation.prototype.addPerson = function(personId) {
	if(this.status === "available"){
		this.people.push(personId);
	}
};

module.exports = Conversation;