var ejs = require("ejs");

var mq_client = require('../rpc/client');

exports.getClient = function(req,res){
	console.log("In Search Function");
	var searchid=req.param("client_id");
	var msg_payload = { "searchid":searchid, "service": "search" };
	
	console.log("In POST Request = UserName:"+" "+searchid);
	
	mq_client.make_request('client_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.firstname == 401){
				
				console.log("Invalid search");
				res.send({"login":"Fail"});
			}
			else {    
				console.log("Can I get firstname"+results.check_point_id);
				console.log("Can I get lastname"+results.guard_id);
				res.send({"client_number":results.client_number,"monthly_service_charge":results.monthly_service_charge,"Balance":results.Balance,"service_start_date":results.service_start_date,"service_end_date":results.service_end_date});
				console.log("valid search");
			}
		}  
	});
};

//added by Vedang
exports.getAllClients = function(req,res){
	console.log("In getAllClients Function");
	var msg_payload = { "service": "getAllClients" };

	mq_client.make_request('client_queue',msg_payload, function(err,results){
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.firstname == 401){
				
				console.log("Invalid search");
				res.send({"login":"Fail"});
			}
			else
			{
				var response = 
				{
						statusCode : 200,
						results : results
				};

				res.send(JSON.stringify(response));
			}
		}  
	});
};

exports.addClient = function(req,res){
	console.log("In add Function");
	var client_id_no=req.param("client_id_no");
	var client_name=req.param("client_name");
	var balance = req.param("balance");
	var monthly_Service_charge=req.param("monthly_Service_charge");
	var service_start_date=req.param("service_start_date");
	var service_end_date=req.param("service_end_date");
	
    var msg_payload = { "client_id_no": client_id_no,"client_name":client_name, "monthly_Service_charge":monthly_Service_charge,"balance":balance, "service_start_date":service_start_date, "service_end_date":service_end_date, "service": "add" };
	
	console.log("In POST Request = client_id_no:"+ client_id_no+" ");
	
	mq_client.make_request('client_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.statusCode == 200){
				var result = results.results;
				res.render("add_buildings",{"client_id":result[0].client_id,"client_name":client_name});
				
			}
			else {    
				res.render("errorPage",{"error":"Client already Present with the same Client Number"});
			}
		}  
	});
	
};


exports.updateClient = function(req,res){
	console.log("In edit Function");
	var client_id = req.param("client_id");
	var balance = req.param("balance");
	var client_name = req.param("client_name");
	var client_id_no=req.param("client_number");
	var monthly_Service_charge=req.param("monthly_Service_charge");
	var service_start_date=req.param("service_start_date");
	var service_end_date=req.param("service_end_date");
	var msg_payload = {"client":client_id,"client_id_no": client_id_no,"client_name":client_name,"balance":balance, "monthly_Service_charge":monthly_Service_charge, "service_start_date":service_start_date, "service_end_date":service_end_date, "service": "edit" };
	
	console.log("In POST Request = UserName:"+" "+client_id_no);
	
	mq_client.make_request('client_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.firstname == 401){
				
				console.log("Invalid search");
				res.render("clients");
				//res.send({"login":"Fail"});
			}
			else { 
				
				res.render("clients");
				//res.send({"login":"success"});
				//console.log("valid search");
			}
		}  
	});
};

exports.deleteClient = function(req,res){
	console.log("In delete Function");
	var clientId=req.param("client_id");
	var msg_payload = { "clientId":clientId, "service": "delete" };
	
	//console.log("In POST Request = UserName:"+" "+searchid);
	
	mq_client.make_request('client_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.length == 0){
				
				//console.log("Invalid search");
				res.send({"login":"-1"});
			}
			else {   
				res.send({"login":"1"});
				console.log("valid search");
			}
		}  
	});
};

//added by Vedang
exports.generateBill = function(req, res){
	var client_name = req.param("client_name");
	var client_id = req.param("client_id");
	var client_number = req.param("client_number");
	var monthly_service_charge = req.param("monthly_charge");
	var balance = req.param("balance");
	res.render("client_bills",{"client_name":client_name,"client_id":client_id,
		"monthly_service_charge":monthly_service_charge,"balance":balance,"client_number":client_number});
};

//added by Vedang
exports.redirectToAddClient = function(req,res){
	res.render("add_client");
};

exports.goToClientHome = function(req,res){
	res.render("clients");
};

exports.goToUpdateClient = function(req,res){

	console.log("In Search Function");
	var client_id=req.param("client_id");
	var msg_payload = { "searchid":client_id, "service": "search" };
	
	console.log("In POST Request = UserName:"+" "+client_id);
	
	mq_client.make_request('client_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.firstname == 401){
				console.log("Invalid search");
				res.send({"login":"Fail"});
			}
			else {    
				res.render("updateClient",{"client_id":client_id,"client_number":results.client_number,"client_name":results.client_name, "monthly_service_charge":results.monthly_service_charge,"Balance":results.Balance,"service_start_date":results.service_start_date,"service_end_date":results.service_end_date});
				console.log("valid search");
			}
		}  
	});

};
