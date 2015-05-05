var db = require('../db');
var Pharmacy = db.model('Pharmacy', 
	{
		OrgCode: { type: String, required: true },
		Name: { type: String, require: true }
	});
module.exports = Pharmacy;