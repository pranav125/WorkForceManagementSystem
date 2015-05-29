var mq_client = require('../rpc/client');

function addGuard(req, res) {

	var input = JSON.parse(JSON.stringify(req.body));
	console.log(req.body);
	var msg_payload = {
		"Guard_id" : input.Guard_id,
		// "Guard_id_no" : input.Guard_id_no,
		"Firstname" : input.Firstname,
		"Lastname" : input.Lastname,
		"Address" : input.Address,
		"City" : input.City,
		"State" : input.State,
		"ZipCode" : input.ZipCode,
		"PhoneNumber" : input.PhoneNumber,
		"Email" : input.Email,
		"method" : "addGuard"
	};

	// console.log(msg_payload);
	mq_client.make_request('guard_queue', msg_payload, function(err, results) {

		
		if (err) {
			throw err;
		} else {
//			req.session.email = results[0].email;
//			req.session.uid = results[0].uid;
//			console.log(req.session.email);
//			console.log(results);
//			// res.header('Cache-Control', 'no-cache, private, no-store,
//			// must-revalidate, max-stale=0, post-check=0, pre-check=0');
//			console.log("valid Login");
			console.log(JSON.stringify(results)+" results");
			if(results.status == 204 )
				{
				res.render("signup",{"guard_id":results.results[0].guard_id});
				}
			else{
				res.render("errorPage",{"error":"Guard Already Exists"});
			}

		}
	});

}

function displayGuard(req, res) {

	// if (req.session.email) {
	// console.log(req.session.email);
	// var newconnection = mysql.getConnection();
	// var input = JSON.parse(JSON.stringify(req.body));
	// emailGlobal =input.email;
	// console.log(input.email);

	var msg_payload = {
		// "firstname": input.firstname,
		// "Guard_id" : input.Guard_id,
		"method" : "displayGuard"
	};

	// console.log("In POST Request = email:"+ input.email+ " "+
	// req.session.uid);

	mq_client.make_request('guard_queue', msg_payload, function(err, results) {

		console.log(results);
		if (err) {
			throw err;
		} else {

			res.send(JSON.stringify(results));
		}

		// res.render('searchGuard.ejs',{results:results, title:"WorkForce
		// Management System"},function(err, result) {
		// // render on success
		// if (!err) {
		// res.end(result);
		// }
		// // render or error
		// else {
		// console.log(err);
		// res.end('An error occurred');
		// }
	});

}

function getGuard(req, res) {

	var msg_payload = {
		// "firstname": input.firstname,
		// "Guard_id" : input.Guard_id,
		"method" : "getGuard"
	};

	mq_client.make_request('guard_queue', msg_payload, function(err, results) {

		console.log(results);
		if (err) {
			throw err;
		} else {

			res.send(JSON.stringify(results));
		}

	});

}

function getAllGuards(req, res) {

	var msg_payload = {
		"method" : "getAllGuards"
	};

	mq_client.make_request('guard_queue', msg_payload, function(err, results) {

		console.log(results);
		if (err) {
			throw err;
		} else {

			res.send(JSON.stringify(results));
		}

	});

}

function updateGuard(req, res) {
	// check user already exists

	var input = JSON.parse(JSON.stringify(req.body));

	var msg_payload = {
		"Guard_id" : input.Guard_id,
		"Firstname" : input.Firstname,
		"Lastname" : input.Lastname,
		"Address" : input.Address,
		"City" : input.City,
		"State" : input.State,
		"ZipCode" : input.ZipCode,
		"PhoneNumber" : input.PhoneNumber,
		"Email" : input.Email,
		"method" : "updateGuard"
	};

	mq_client.make_request('guard_queue', msg_payload, function(err, results) {

		console.log(results);
		if (err) {
			throw err;
		} else {
//			req.session.email = results[0].email;
//			req.session.uid = results[0].uid;

//			console.log(req.session.email);
//			console.log(results);
//			console.log("valid Login");
//			console.log("time:" + results[0].lastLogin);
			res.render("searchGuard");
		}
	});

}

function getClientAndBuilding(req, res) {

	console.log(req);
	var input = JSON.parse(JSON.stringify(req.body));

	var msg_payload = {
		"Guard_id" : input.Guard_id,
		"Firstname" : input.Firstname,
		"Lastname" : input.Lastname,
		"Address" : input.Address,
		"City" : input.City,
		"State" : input.State,
		"ZipCode" : input.ZipCode,
		"PhoneNumber" : input.PhoneNumber,
		"Email" : input.Email,
		"method" : "getClientAndBuilding"
	};

	mq_client.make_request('guard_queue', msg_payload, function(err, results) {

		console.log(results);
		if (err) {
			throw err;
		} else {
			console.log(JSON.stringify(results)+" RSULTS");
			res.send(JSON.stringify(results));

		}
	});
}

function assignGuard(req, res) {
	console.log(req);
	var input = JSON.parse(JSON.stringify(req.body));

	var msg_payload = {
		"check_point_id":input.check_point_id,
		"guard_id":input.guard_id,
		"method" : "assignGuard"
	};

	console.log(msg_payload);
	mq_client.make_request('guard_queue', msg_payload, function(err, results) {

		console.log(results);
		if (err) {
			throw err;
		} else {
			res.send(JSON.stringify(results));

		}
	});
}

function deleteGuard(req, res) {
	
	var msg_payload = {
		"Guard_id" : req.param("guard_id"),
		"method" : "deleteGuard"
	};

	console.log(msg_payload+" payload" );
	mq_client.make_request('guard_queue', msg_payload, function(err, results) {

		console.log(results);
		if (err) {
			throw err;
		} else {

			res.send(JSON.stringify(results));
		}
	});

}

exports.redirectToAssignGuard = function(req,res){
	res.render("assignGuard");
};

exports.redirectToGuards = function(req,res){
	res.render("searchGuard");
};

exports.redirectToAddGuard = function(req,res){
	res.render("add_Guard");
};

exports.redirectToUpdateGuard = function(req,res){
	res.render("update_Guard");
};

exports.goToGuardsHome = function(req,res){
	res.render("guardHome");
};

exports.getGuardLocation = function(req,res){
	var msg_payload = {

			"guard_id" : req.param("guard_id"),
			"method" : "getGuardLocation"
		};

		console.log(req.param("guard_id")+" in there");
		mq_client.make_request('guard_queue', msg_payload, function(err, results) {

			console.log(results);
			if (err) {
				throw err;
			} else {

				res.send(JSON.stringify(results));
			}
		});
};

exports.diplay_location_guard = function(req,res){
	res.render("display_location",{"latitude":req.param("latitude"),"longitude":req.param("longitude")});
};

exports.getGuard = getGuard;
exports.getClientAndBuilding = getClientAndBuilding;
exports.deleteGuard = deleteGuard;
exports.updateGuard = updateGuard;
exports.addGuard = addGuard;
exports.displayGuard = displayGuard;
exports.assignGuard = assignGuard;
exports.getAllGuards = getAllGuards;