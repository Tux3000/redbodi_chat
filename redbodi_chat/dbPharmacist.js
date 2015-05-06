var pharmacist = require('mongoose');
pharmacist.connect('mongodb://localhost/redbodi/pharmacist/', function(){
	console.log('mongodb pharmacist connected');
});

module.exports = pharmacist;