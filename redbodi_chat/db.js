var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/redbodi/pharmacies/', function(){
	console.log('mongodb connected');
});

module.exports = mongoose;