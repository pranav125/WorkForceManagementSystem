
var ejs = require("ejs");

var mq_client = require('../rpc/client');

exports.showBuilding = function(req,res){
	console.log("In Search Function of Building");
	var client_id=req.param("client_id");
	var client_name = req.param("client_name");
	var msg_payload = { "client_id":client_id, "service": "searchBuild" };
	
	mq_client.make_request('building_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.length == 0){
				
				res.render('clients', { title: 'Express' });
//				var response = 
//				{
//						statusCode : 200,
//						results : null,
//						client_name : client_name
//				};
//
//				res.render("buildings",{"results":results,"client_id":client_id,"client_name":client_name});
			}
			else {    
				var response = 
				{
						statusCode : 200,
						results : results,
						client_name : client_name
				};

				res.render("buildings",{"results":results,"client_id":client_id,"client_name":client_name});
			}
		}  
	});
};


exports.redirectToAddBuildings = function(req, res)
{
	var client_id = req.param("client_id");
	var client_name = req.param("client_name");
	res.render("add_buildings",{"client_id":client_id,"client_name":client_name});
};

exports.redirectToEditBuildings = function(req, res)
{
	var building_id = req.param("building_id");
	var latitude = req.param("location_latitude");
	var longitude = req.param("location_longitude");
	res.render("edit_building",{"building_id":building_id,"latitude":latitude,"longitude":longitude});
};

exports.view_building = function(req, res)
{
	var building_id = req.param("building_id");
	var building_name = req.param("building_name");
	var client_name = req.param("client_name");
	var client_id = req.param("client_id");
	var service_fee = req.param("service_fee");
	var release_date = req.param("release_date");
	var location_latitude = req.param("location_latitude");
	var location_longitude = req.param("location_longitude");
	res.render("view_building",{"building_id":building_id,"client_id":client_id,"building_name":building_name,
		"client_name":client_name,"service_fee":service_fee,"release_date":release_date,
		"location_latitude":location_latitude,"location_longitude":location_longitude});
};

exports.addBuilding = function(req,res){
	
	var client_id=req.param("client_id");
	var building_name = req.param("building_name");
	var latitude = req.param("latitude");
	var longitude = req.param("longitude");
	var service_fee=req.param("service_fee");
	var release_date=req.param("release_date");
	
    var msg_payload = {
    		"building_name":building_name,
    		"client_id":client_id,
    		"latitude":latitude,
    		"longitude":longitude,
    		"service_fee":service_fee, 
    		"release_date":release_date,
    		"service": "addBuilding" };
	
	console.log("In POST Request addBuilding = "+JSON.stringify(msg_payload) );
	
	mq_client.make_request('building_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				res.send({"login":"success"});
				
			}
			else {    
				console.log("Invalid search");
				res.send({"login":"Fail"});
			}
		}  
	});
	
};


exports.updateBuilding = function(req,res){
	console.log("In edit Function");
	var building_id=req.param("building_id");
	var building_name = req.param("building_name");
	var latitude = req.param("latitude");
	var longitude = req.param("longitude");
	var service_fee=req.param("service_fee");
	var release_date=req.param("release_date");
	var msg_payload = { "building_id":building_id,
			"building_name":building_name, "latitude":latitude,"longitude":longitude,
			"service_fee":service_fee, "release_date":release_date, "service": "edit" };
	
	console.log("In POST Request = building_id:"+" "+building_id);
	
	mq_client.make_request('building_queue',msg_payload, function(err,results){
		
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
						statusCode : 200,
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

exports.deleteBuilding = function(req,res){
	console.log("In delete Function");
	var building_id=req.param("building_id");
	var msg_payload = { "searchname":building_id, "service": "delete" };
	
	console.log("In POST Request = UserName:"+" "+building_id);
	
	mq_client.make_request('building_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.firstname == 401){
				
				console.log("Invalid search");
				res.render("clients",{"title":"Application"});
				//res.send({"login":"Fail"});
			}
			else {    
				console.log("Can I get firstname"+results.check_point_id);
				console.log("Can I get lastname"+results.guard_id);
				res.render("clients",{"title":"Application"});
				//res.send({"firstname":results.check_point_id,"lastname":results.guard_id});
			//	console.log("valid search");
			}
		}  
	});
};

exports.getBuildingDetails = function(req,res)
{
	var building_id = req.param("building_id");
	var msg_payload = {"building_id":building_id,"service":"getBuildingDetails"};
	
	console.log("getBuildingDetails Payload :: "+JSON.stringify(msg_payload));
	
	mq_client.make_request('building_queue',msg_payload, function(err,results){
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				var response = {
						statusCode : 200,
						message : results
				};
				
				res.send(JSON.stringify(response));
			}
			else {
				var responseFailure = {
						statusCode : 401,
						message : results
				};
				
				res.send(JSON.stringify(responseFailure));
			}
		}  
	});
};

exports.clientBuilding = function(req,res)
{
	
	var clientid = req.param("clientid");
	console.log(clientid);
	var msg_payload = {"clientid":clientid, "service":"clientbuild"};
	mq_client.make_request("building_queue", msg_payload, function(err,results){
		if(err)
			{
			 console.log(err);
			
			}
		else
			{
			  if(results.length>0)
				  {
				  console.log(results);  
				  res.send(results);
				  }
			  else
				  {
				  res.send({"building":"no building"});
				  }
			
			}
	});
	

};

