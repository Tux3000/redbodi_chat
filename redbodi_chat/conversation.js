function Conversation(name, id, owner){
	this.name = name;
	this.id = id;
	this.owner = owner;
	this.people = [];
	this.status = "available";
};

Conversation.prototype.addPerson = function(personId) {
	if(this.status === "available"){
		this.people.push(personId);
	}
};

module.exports = Conversation;