var router = require('express').Router();
var Pharmacist = require('../../models/pharmacist');
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var config = require('../../config');

router.post('/', function(req, res, next) {
	Pharmacist.findOne({ name: req.body.name })
		.select('password').select('name')
		.exec(function(err, pharmacist){
			if(err) {
				return next(err);
			}
			if(!pharmacist){
				return res.status(401);
			}
			bcrypt.compare(req.body.password, pharmacist.password, function(err, valid) {
				if(err){
					return next(err);
				}
				if(!valid){
					return res.status(401);
				}

				var token = jwt.encode({ name: pharmacist.name }, config.secret);
				res.status(201).send(token);
			});
		});
});
module.exports = router;