var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pharmacies', function(){
	console.log('mongodb connected');
});

module.exports = mongoose;