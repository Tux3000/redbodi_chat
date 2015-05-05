var db = require('../db');
var Pharmacy = db.model('Pharmacy', 
	{
		OrgCode: { type: String, required: true },
		Name: { type: String, require: true },
		Address1: { type: String, require: true },
		Address2: { type: String, require: true },
		Address3: { type: String, require: true },
		PostCode: { type: String, require: true }
	});
module.exports = Pharmacy;