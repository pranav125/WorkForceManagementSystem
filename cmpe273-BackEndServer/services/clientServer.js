//var mysql = require('./mysql');
var mysql = require('./custom_connection_pooling');
var redis = require('redis');
var client = redis.createClient();

function search_request(msg, callback){

	var res = {};
	console.log("In handle request herrrrreee in client:"+ msg.searchBuilding);
	var searchUser="select client_number,client_name,monthly_service_charge,Balance,service_start_date,service_end_date from client where client_id ='"+msg.searchid+"'";
	console.log("Query is:"+searchUser);

	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("valid Login");
				console.log("fetchdata");
				//res.redirect('/home');
				console.log("Can I get firstname"+results[0].client_number);
				console.log("Can I get lastname"+results[0].Balance);
				res.client_number=results[0].client_number;
				res.monthly_service_charge=results[0].monthly_service_charge;
				res.Balance=results[0].Balance;
				res.service_start_date=results[0].service_start_date;
				res.service_end_date=results[0].service_end_date;
				res.client_name = results[0].client_name;
			}
			else {    
				console.log("Invalid search");
				res.firstname = "401";
				res.lastname = "Invalid search";
			}
		}  
		callback(null, res); 
	},searchUser);
}

function getAllClients(msg, callback){

	var searchUser="select client_id,client_number,client_name,monthly_service_charge,Balance,service_start_date,service_end_date from client;";
	console.log("Query is:"+searchUser);

	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("valid Login");
				console.log("fetchdata");
				
				callback(null, results); 
			}
			else {    
				console.log("Invalid search");
				callback(null, {"401":"Invalid Search",}); 
			}
		}   
	},searchUser);
}


function add_request(msg, callback){

	var res = {};
	console.log("In handle request:"+ msg.check_point_id);
	var validateQuery = "select client_name from client where client_number='"+msg.client_id_no+"';";
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length == 0)
			{
				var addClient="insert into client (client_number,monthly_service_charge,Balance,service_start_date,service_end_date,client_name) values('"+msg.client_id_no+"'"+","+""+msg.monthly_Service_charge+""+", "+msg.balance+" ,"+"'"+msg.service_start_date+"'"+","+"'"+msg.service_end_date+"'"+",'"+msg.client_name+"')";
				console.log("Query is:"+addClient);

				mysql.fetchData(function(err,results){
					if(err){
						throw err;
					}
					else 
					{
						var getSQLQuery = "select client_id from client where client_number='"+msg.client_id_no+"' order by client_id desc;";

						mysql.fetchData(function(err,results){
							if(err){
								throw err;
							}
							else 
							{
								if(results.length > 0)
								{
									var response ={
											statusCode : 200,
											results : results
									};
									callback(null, response);
									
								}
								callback(null, results); 
							}  
						},getSQLQuery);
					}  
				},addClient);
			}
			else
				{
				
				var response ={
						statusCode : 401,
						results : results
				};
				callback(null, response);
				}
		}  
	},validateQuery);
}


function edit_request(msg, callback){

	var res = {};
	//console.log("In handle request:"+ msg.searchname);

	var searchUser="update client set client_number = '"+msg.client_id_no+"',client_name= '"+msg.client_name +"', monthly_service_charge = '"+msg.monthly_Service_charge+"',Balance = "+msg.balance+",service_start_date = '"+msg.service_start_date+"',service_end_date = '"+msg.service_end_date+"' where client_id = "+msg.client;
	console.log("Query is:"+searchUser);

	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("valid Login");
				console.log("fetchdata");
				//res.redirect('/home');
				console.log("Can I get firstname"+results[0].check_point_id);
				console.log("Can I get lastname"+results[0].guard_id);
				res.firstname="200";
				res.lastname="Valid Search";
			}
			else {    
				console.log("Invalid search");
				res.firstname = "401";
				res.lastname = "Invalid search";
			}
		}  
		callback(null, res); 
	},searchUser);
}

function delete_request(msg, callback){

	var res = {};
	console.log("In handle request:"+ msg.searchid);
	var searchUser="delete from client where client_id ='"+msg.clientId+"'";
	console.log("Query is:"+searchUser);

	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("valid Login");
				console.log("fetchdata");
				callback(null, results); 

			}
			else {    
				console.log("Invalid search");
				res.firstname = "401";
				res.lastname = "Invalid search";
				callback(null, results); 
			}
		}  
		callback(null, res); 
	},searchUser);
}


exports.add_request = add_request;
exports.search_request = search_request;
exports.edit_request = edit_request;
exports.delete_request = delete_request;
exports.getAllClients = getAllClients;
