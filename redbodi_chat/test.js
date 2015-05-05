var pharm = require('./models/pharmacy');

pharm.findOne({OrgCode: "FA002"}).select('Name')
	.exec(function(err, pharma){
		if(err){ 
			console.log(err);
			return next(err);
		}
		if(!pharma){
			console.log('no pharmacy found');
		}

		console.log('Matching pharmacy: ' + pharma.Name + pharma._id);
	});