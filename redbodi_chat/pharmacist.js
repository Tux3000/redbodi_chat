var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pharmacists');
var pharmacist = mongoose.Schema({
	username: String,
	password: {type: String, select: false}
});

module.exports = mongoose.model('Pharmacist', pharmacist);