var ejs = require("ejs");
var mq_client = require('../rpc/client');
var building = require('./building');

exports.addCheckPoint = function(req, res)
{
	var TABLE_NAME = 'check_point';
	var buildingId = req.param("building_id");
	var guardId = 10;// req.param("guard_id");
	var clientId = req.param("client_id");
	var startLatitude = req.param("start_latitude");
	var endLatitude = req.param("end_latitude");
	var startLongitude = req.param("start_longitude");
	var endLongitude = req.param("end_longitude");
	var timeFromStartToEnd = 10;//req.param("time_from_start_to_end"); // this time is in minutes

//	if(req.session.userId)
//	{
		var msg_payload = { "buildingId": buildingId,"guardId":guardId,"clientId":clientId,"startLatitude":startLatitude,
				"endLatitude":endLatitude,"startLongitude":startLongitude,"endLongitude":endLongitude,"timeFromStartToEnd":timeFromStartToEnd,"method":"addCheckPoint" };
		console.log(msg_payload+" msg_payload");
		mq_client.make_request('check_point_queue',msg_payload, function(err,results){

			console.log(results);
			if(err){
				throw err;
			}
			else 
			{
				if(results.statusCode == 200){	
					console.log(results+" results in addCheckPoint");
					res.render('clients', { title: 'Express' });
					//res.send(JSON.stringify(results));
				}
				else {    
					//building.showBuilding(req,res);
					console.log("Invalid Login");
					res.render('clients', { title: 'Express' });
					//res.send(JSON.stringify(results));
				}
			}  
		});
	//}
};

exports.updateCheckPoint = function(req, res)
{
	var TABLE_NAME = 'check_point';
	var check_point_id = req.param("check_point_id");
	var buildingId = req.param("building_id");
	var guardId = req.param("guard_id");
	var clientId = req.param("client_id");
	var startLatitude = req.param("start_latitude");
	var endLatitude = req.param("end_latitude");
	var startLongitude = req.param("start_longitude");
	var endLongitude = req.param("end_longitude");
	var timeFromStartToEnd = req.param("time_from_start_to_end"); // this time is in minutes
	
	var msg_payload = {"check_point_id":check_point_id, "buildingId": buildingId,"guardId":guardId,"clientId":clientId,"startLatitude":startLatitude,
			"endLatitude":endLatitude,"startLongitude":startLongitude,"endLongitude":endLongitude,"timeFromStartToEnd":timeFromStartToEnd,"method":"updateCheckPoint" };
	console.log(msg_payload+" msg_payload");
	mq_client.make_request('check_point_queue',msg_payload, function(err,results){

		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.statusCode == 200){	
				console.log(results+" results in addCheckPoint");
				res.send(JSON.stringify(results));
			}
			else {    

				console.log("Invalid Login");
				res.send(JSON.stringify(results));
			}
		}  
	});
};

exports.removeCheckPoint = function(req, res)
{
	var TABLE_NAME = 'check_point';
	var check_point_id = req.param("check_point_id");
	var msg_payload = {"check_point_id":check_point_id,"method":"removeCheckPoint" };
	console.log(msg_payload+" msg_payload");
	mq_client.make_request('check_point_queue',msg_payload, function(err,results){

		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.affectedRows > 0)
			{
				var response = 
				{
						statusCode : 204,
						results : results
				};

				res.send(JSON.stringify(response));
			}
			else
			{
				var responseFailure = 
				{
						statusCode : 401,
						results : results
				};

				res.send(JSON.stringify(responseFailure));
			}
		}  
	});

};

exports.getCheckPointForBuilding = function(req, res)
{
	var TABLE_NAME = 'check_point';
	var building_id = req.param("building_id");
	var msg_payload = {"building_id":building_id,"method":"getCheckPointForBuilding" };
	console.log(JSON.stringify(msg_payload)+" msg_payload");
	mq_client.make_request('check_point_queue',msg_payload, function(err,results){

		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){	
				console.log(JSON.stringify(results)+" results in getCheckPointForBuilding");
				res.send(JSON.stringify(results));
			}
			else {    

				console.log("Invalid Login");
				res.send(JSON.stringify(results));
			}
		}  
	});
};


exports.getCheckPoint = function(req, res)
{
	var TABLE_NAME = 'check_point';
	var check_point_id = req.param("check_point_id");
	var msg_payload = {"check_point_id":check_point_id,"method":"getCheckPoint" };
	console.log(msg_payload+" msg_payload");
	mq_client.make_request('check_point_queue',msg_payload, function(err,results){

		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.statusCode == 200){	
				console.log(results+" results in getCheckPoint");
				res.send(JSON.stringify(results));
			}
			else {    

				console.log("Invalid Login");
				res.send(JSON.stringify(results));
			}
		}  
	});
};

//added by Vedang
exports.redirectToAddBuildings = function(req,res){
	
	var building_id = req.param("building_id");
	var client_id = req.param("client_id");
	var client_name = req.param("client_name");
	var building_name = req.param("building_name");
	var latitude = req.param("latitude");
	var longitude = req.param("longitude");
	
	res.render("addCheckPoint",
			{"building_id":building_id,
			"client_id":client_id,
			"client_name":client_name,
			"building_name":building_name,
			"latitude":latitude,
			"longitude":longitude
			});
};

exports.getCheckPointInfo = function(req, res)
{
	var TABLE_NAME = 'check_point';
	var check_point_id = req.param("check_point_id");
	var msg_payload = {"check_point_id":check_point_id,"method":"getCheckPointInfo" };
	console.log(msg_payload+" msg_payload");
	mq_client.make_request('check_point_queue',msg_payload, function(err,results){

		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.statusCode == 200){	
				console.log(results+" results in getCheckPointInfo");
				res.send(JSON.stringify(results));
			}
			else {    

				console.log("Invalid Login");
				res.send(JSON.stringify(results));
			}
		}  
	});
};

exports.getCheckPointGetGuard = function(req, res)
{
	var TABLE_NAME = 'guard';

	console.log(req.session.guard_id+" SESSION VALUE");
	var msg_payload = {"guard_id":req.session.guard_id,"method":"getCheckPointForGuard" };
	console.log(msg_payload+" msg_payload");
	mq_client.make_request('check_point_queue',msg_payload, function(err,results){

		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.statusCode == 200){	
				console.log(results+" results in getCheckPoint");
				res.send(results);
			}
			else {    

				console.log("Invalid Login");
				res.send(JSON.stringify(results));
			}
		}  
	});
};
