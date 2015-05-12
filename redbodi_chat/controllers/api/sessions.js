var router = require('express').Router();
var Pharmacist = require('../../models/pharmacist');
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var config = require('../../config');

router.post('/', function(req, res, next) {
	console.log('login ' + req.body.name + req.body.password);
	Pharmacist.findOne({ name: req.body.name })
		.select('password').select('name')
		.exec(function(err, pharmacist){
			if(err) {
				console.log(err);
				return next(err);
			}
			if(!pharmacist){
				console.log('no such pharmacist');
				return res.status(401);
			}
			bcrypt.compare(req.body.password, pharmacist.password, function(err, valid) {
				if(err){
					console.log(err);
					return next(err);
				}
				if(!valid){
					console.log('not valid');
					return res.status(401);
				}

				var token = jwt.encode({ name: pharmacist.name }, config.secret);
				console.log(token);
				res.status(201).json(token);
			});
		});
});
module.exports = router;