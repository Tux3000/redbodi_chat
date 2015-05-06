var db = require('../dbPharmacist');
var Pharmacist = db.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	orgCode: { type: String, required: true },
	password: { type: String, required: true, select: false }
});

module.exports = db.model('Pharmacist', Pharmacist);