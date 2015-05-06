var pharmcies = require('mongoose');
pharmcies.connect('mongodb://localhost/redbodi/pharmacies/', function(){
	console.log('mongodb pharmacies connected');
});

module.exports = pharmcies;