var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pharmacists');
var pharmacist = mongoose.schema({
	username: String,
	password: {type: String, select: false}
});

module.exports = mongoose.model('Pharmacist', pharmacist);