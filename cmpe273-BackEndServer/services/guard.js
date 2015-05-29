var ejs = require('ejs');
var mysql = require('./mysqlPranav');
//var session = require('express-session');
var emailGlobal = '';

function addGuard(msg, callback) {

	var res = {};
	var newconnection = mysql.getConnection();
	console.log("hoooo/..........");
	var data = {
			"guard_id" : msg.Guard_id,
			"firstname" : msg.Firstname,
			"lastname" : msg.Lastname,
			"address" : msg.Address,
			"city" : msg.City,
			"state" : msg.State,
			"zipCode" : msg.ZipCode,
			"phoneNumber" : msg.PhoneNumber,
			"email" : msg.Email,
			"checkpoint_assigned":"0"
	};

	var selectQuery = "select email from guard where guard_id='"+msg.Guard_id+"'";

	mysql.fetchData(function(err, results)
			{
		if (err) 
		{
			throw err;
		} 
		else
		{
			if (results.length == 0) 
			{
				console.log("getting data");

				var query = newconnection.query('Insert INTO guard SET ?', data,
						function(err, result) {				
					var getUser = "select * from guard where email = '"+ data.email + "'";
					console.log(query);
					console.log(getUser);
					mysql.fetchData(function(err, results1) {
						if (err) {
							throw err;
						} else {


							if (results1.length > 0) {
								var response = {
										status : 204,
										results : results1
								};

								callback(null, response);
							}
						}
					}, getUser);
				});
			}
			else
			{
				var response1 = {
						status : 401,
						results : results
				};

				callback(null, response1);
			}
		}
			}, selectQuery);
}



function deleteGuard(msg, callback){
	var res = {};
	var Guard_id = msg.Guard_id;
	var getUser2 = "Delete from guard WHERE guard_id = '"+ Guard_id +"'" ;

	mysql.fetchData(function(err,results){

		if(err){
			throw err;	
		}

		else{
			if(results.length > 0){
				console.log(results);
				callback(null, results);	  	
			}	
		}   		
	},getUser2);

}


function updateGuard(msg , callback){
	var newconnection = mysql.getConnection();

	var currentdate = new Date();
	console.log(msg);
	var data = {
			"guard_id" : msg.Guard_id,
			"firstname" : msg.Firstname,
			"lastname" : msg.Lastname,
			"address" : msg.Address,
			"city" : msg.City,
			"state" : msg.State,
			"zipCode" : msg.ZipCode,
			"phoneNumber" : msg.PhoneNumber,
			"email" : msg.Email,
	};
	var res={};
	var query = newconnection.query("update guard SET ? where guard_id=\""+data.guard_id+"\"", data ,function(err, result) {

		var getUser3 = "select  * from guard where firstname = '"+ data.firstname + "' and lastname = '"+ data.lastname + "' and address = '"+ data.address + "' and city = '"+ data.city + "' and state = '"+ data.state +"' and zipCode = '"+ data.zipCode +"' and phoneNumber = '"+ data.phoneNumber + "' and email = '"+ data.email + "'";
		mysql.fetchData(function(err, results) {callback(null, results);}, getUser3);
	});

}

function getClientAndBuilding(msg, callback){
	
	console.log(msg);
    var res = {};
    var getUser2 = "select b.building_name,c.client_name,ch.check_point_id,ch.start_latitude,ch.end_latitude,ch.start_longitude,ch.end_longitude from project.building b, project.client c, project.check_point ch where b.building_id=ch.buidling_id and c.client_id=ch.client_id and ch.guard_assigned=0";

 mysql.fetchData(function(err,results){
	
    if(err){
	  throw err;	
	  }
	
	else{
		if(results.length > 0){
			console.log(results);
			callback(null,results);	
		}	
	}   		
 },getUser2);            
} 

function assignGuard(msg, callback){
    var res = {};
    console.log(msg.check_point_id+" CHECK_POINT_ID");
    
    var firstQuery = "update guard set check_point_id="+msg.check_point_id+", checkpoint_assigned=1 where guard_id='"+msg.guard_id+"';";
    
    mysql.fetchData(function(err,results){
    	
    	if(results.affectedRows > 0)
    		{
    			var secondQuery = "update check_point set guard_assigned=1 where check_point_id="+msg.check_point_id+";";
    			
    			mysql.fetchData(function(err,results){
    		    	callback(null,results);
    		    },secondQuery);
    		}
    	//callback(null,res);
    },firstQuery);
    
 
} 


function displayGuard(msg, callback){

	var res = {};
	var email = msg.email;
	var Guard_id = msg.Guard_id;
	var getUser2 = "Select guard_id,firstname,lastname,email from guard";

	mysql.fetchData(function(err,results){

		if(err){
			throw err;	
		}

		else{
			if(results.length > 0){
				console.log(results);
				callback(null, results);	  	
			}	
		}   		
	},getUser2);    
}

function getGuard(msg, callback){
	var res = {};
	var getUser2 = "Select * from guard where checkpoint_assigned=0";
	mysql.fetchData(function(err,results){

		if(err){
			throw err;	
		}

		else{
			if(results.length > 0){
				console.log(results);
				callback(null, results);	  	
			}	
		}   		
	},getUser2); 
}

function getAllGuards(msg, callback){
	var res = {};
	var getUser2 = "Select * from guard;";
	mysql.fetchData(function(err,results){

		if(err){
			throw err;	
		}

		else{
			if(results.length > 0){
				console.log(results);
				callback(null, results);	  	
			}	
		}   		
	},getUser2); 
}

exports.getGuardLocation = function(msg, callback){

	var guard_id = msg.guard_id;
	var getUser2 = "select start_latitude, start_longitude from check_point c,guard g where g.check_point_id=c.check_point_id and " +
	"g.guard_id = '"+guard_id+"';";

	console.log(getUser2+" is there");
	mysql.fetchData(function(err,results){

		if(err){
			throw err;	
		}

		else{
			if(results.length > 0){
				console.log(results);
				callback(null, results);	  	
			}	
		}   		
	},getUser2);   
};

exports.getGuard = getGuard;
exports.getAllGuards = getAllGuards;
exports.addGuard = addGuard;
exports.displayGuard = displayGuard;
exports.updateGuard = updateGuard;
exports.deleteGuard = deleteGuard;
exports.getClientAndBuilding = getClientAndBuilding;
exports.assignGuard = assignGuard;