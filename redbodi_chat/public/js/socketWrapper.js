function SocketWrapper(ioSocket){
	this.ioSocket = ioSocket;
};


SocketWrapper.prototype.registerHandler = function(eventName, delegate){
	this.ioSocket.on(eventName, delegate);
};



/*SocketEventAggregator.prototype.publish = function(eventName, payload){

}



function setupEmitters(){
	setupEmitters['someevent'].push(function(payloadItem){
		this.ioSocket.emit('someevent', payloadItem);
	});
}*/



module.exports = SocketWrapper;
