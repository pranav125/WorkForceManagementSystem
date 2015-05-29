var mysql = require('./mysql');

function search_request(msg, callback){

	var res = {};
	console.log("In handle request herrrrreee:"+ msg.searchBuilding);
	var searchUser="select building_id,building_name,client_id_fk,address,location_latitude,location_longitude,service_fee,release_date from building where client_id_fk ='"+msg.client_id+"'";
	console.log("Query is:"+searchUser);

	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				callback(null, results); 
			}
			else {    
				console.log("Invalid search");
				res.errorCode = "401";
				res.errorMessage = "Invalid search";
				callback(null, results);
			}
		}  
		callback(null, res); 
	},searchUser);
}


function add_request(msg, callback){

	var res = {};
	console.log("In handle request:"+ msg.check_point_id);
	var addUser="insert into building (client_id_fk,location_latitude,location_longitude,service_fee, release_date,building_name) values("+msg.client_id+""+","+"'"+msg.latitude+"','"+msg.longitude+"','"+msg.service_fee+"'"+","+"'"+msg.release_date+"','"+msg.building_name+"')";
	console.log("Query is:"+addUser);

	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{		
			res.code = "200";
			res.value = "Succes Login";
		}  
		callback(null, res); 
	},addUser);
}


function edit_request(msg, callback){

	console.log("IN update building function :: "+ msg.building_id);
	var building_id=msg.building_id;
	var building_name=msg.building_name;
	var latitude = msg.latitude;
	var longitude = msg.longitude;
	var service_fee=msg.service_fee;
	var release_date=msg.release_date;
	
	var updateBuilding="update building set building_name='"+building_name+"'," +
			" location_latitude='"+latitude+"', location_longitude='"+longitude+"'," +
			" service_fee='"+service_fee+"', release_date='"+release_date+"' where building_id="+building_id;
	
	console.log("Query is:"+updateBuilding);

	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			callback(null,results);
		}  
	},updateBuilding);
}

function delete_request(msg, callback){

	var res = {};
	console.log("In handle request:"+ msg.searchname);
	var searchUser="delete from building where building_id ="+msg.searchname+"";
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

function getBuildingDetails(msg, callback){

	var building_id = msg.building_id;
	
	console.log("IN getBuildingDetails, building_id :: "+building_id);
	
	var getBuildingDetailsQuery="select building_id,c.client_name,client_id_fk,location_latitude,location_longitude,"+
			"service_fee,release_date,building_name from building b,client c where b.client_id_fk=c.client_id and building_id="+building_id+";";
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			callback(null,results);
		}   
	},getBuildingDetailsQuery);
}

function clientbuild (msg,callback)
{
  var res = {};
  
  var qcb = "select building_id,building_name from building where client_id_fk ='"+msg.clientid+"'";
  
  mysql.fetchData(function(err,result){
	  if(err)
		  {
		  throw err;
		  }
	  else
		  {
		  if(result.length>0)
			  {
			   callback(null,result);
			  }
		  else
			  {
			  res.building_id = "Not found";
				  callback(null,res);
			  }
		  }
	  
  },qcb);
}


exports.add_request = add_request;
exports.search_request = search_request;
exports.edit_request = edit_request;
exports.delete_request = delete_request;
exports.getBuildingDetails = getBuildingDetails;
exports.clientbuild = clientbuild;
