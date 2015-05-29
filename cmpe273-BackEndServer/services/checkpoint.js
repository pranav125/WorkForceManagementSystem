var ejs = require("ejs");
var mysql = require('./mysql');

exports.addCheckPoint = function(message, callback)
{
	var TABLE_NAME = 'check_point';
	var buildingId = message.buildingId;
	var guardId = message.guardId;
	var clientId = message.clientId;
	var startLatitude = message.startLatitude;
	var endLatitude = message.endLatitude;
	var startLongitude = message.startLongitude;
	var endLongitude = message.endLongitude;
	var timeFromStartToEnd = message.timeFromStartToEnd; // this time is in minutes

	var addCheckPointQuery = "insert into "+TABLE_NAME+"(buidling_id,client_id,start_latitude,end_latitude,start_longitude,end_longitude,time_from_start_to_end,guard_assigned) "+
	" values"+
	"("+buildingId+","+clientId+",'"+startLatitude+"','"+endLatitude+"','"+startLongitude+"','"+endLongitude+"',"+timeFromStartToEnd+",'0');";

	console.log("Query is addCheckPointQuery: "+addCheckPointQuery);

	mysql.insertData(function(err,results){
		if(err)
		{
			throw err;
		}
		else 
		{
			if(results.affectedRows > 0)
			{
				var responseSuccess = {
						statusCode  : 200,
						statusMessage : 'CheckPoint Added Successfully'
				};

				callback(null, responseSuccess);
			}
			else
			{
				var responseFailure = {
						statusCode  : 401,
						statusMessage : 'CheckPoint Not Added Successfully'
				};

				callback(null, responseFailure);
			}
		}  
	},addCheckPointQuery);
};

exports.updateCheckPoint = function(message, callback)
{

	var TABLE_NAME = 'check_point';
	var check_point_id = message.check_point_id;
	var buildingId = message.buildingId;
	var clientId = message.clientId;
	var startLatitude = message.startLatitude;
	var endLatitude = message.endLatitude;
	var startLongitude = message.startLongitude;
	var endLongitude = message.endLongitude;
	var timeFromStartToEnd = message.timeFromStartToEnd; // this time is in minutes

	var updateCheckPointQuery = "update "+TABLE_NAME+" set buidling_id="+buildingId+", client_id="+clientId+", start_latitude='"+startLatitude+"'," +
	"end_latitude='"+endLatitude+"', start_longitude='"+startLongitude+"'," +
	" end_longitude='"+endLongitude+"',time_from_start_to_end="+timeFromStartToEnd+" where check_point_id="+check_point_id+";";

	console.log("Query is updateCheckPointQuery: "+updateCheckPointQuery);

	mysql.insertData(function(err,results){
		if(err)
		{
			throw err;
		}
		else 
		{
			if(results.affectedRows > 0)
			{
				var responseSuccess = {
						statusCode  : 204,
						statusMessage : 'CheckPoint Updated Successfully'
				};

				callback(null, responseSuccess);
			}
			else
			{
				var responseFailure = {
						statusCode  : 401,
						statusMessage : 'CheckPoint Not Updated Successfully'
				};

				callback(null, responseFailure);
			}
		}  
	},updateCheckPointQuery);

};

exports.removeCheckPoint = function(message, callback)
{
	var TABLE_NAME = 'check_point';
	var check_point_id = message.check_point_id;

	var deleteCheckPointQuery = "delete from "+TABLE_NAME+" where check_point_id="+check_point_id;

	console.log("Query is deleteCheckPointQuery: "+deleteCheckPointQuery);

	mysql.insertData(function(err,results){
		if(err)
		{
			throw err;
		}
		else 
		{
			callback(null,results);
		}  
	},deleteCheckPointQuery);
};

exports.getCheckPointForBuilding = function(message,callback)
{
	var TABLE_NAME = 'check_point';
	var building_id = message.building_id;

	var getCheckPointForBuildingQuery = "select check_point_id, client_id, start_latitude, end_latitude, start_longitude, end_longitude, time_from_start_to_end from "+TABLE_NAME+" "+
	"where buidling_id = "+building_id+";";

	mysql.fetchData(function(err, results)
			{
		if (err) 
		{
			throw err;
		} 
		else
		{
			if (results.length > 0) 
			{
				console.log("getting data");

				var response = {
						statusCode  : 200,
						statusObject : results,
						statusMessage : "Valid Data"
				};

				callback(null, results);
			}
			else
			{
				console.log("InValid Data");

				var responseError = {
						statusCode  : 202,
						statusObject : results,
						statusMessage : "InValid Data"
				};

				callback(null, responseError);
			}
		}
			}, getCheckPointForBuildingQuery);
};

exports.getCheckPointForGuard = function(message,callback)
{
	var TABLE_NAME = 'guard';
	var guard_id = message.guard_id;
	
	
	var getCheckPointQuery = "select c.buidling_id,c.client_id,c.check_point_id from check_point c,guard g where c.check_point_id = g.check_point_id and g.guard_id = '"+guard_id+"';";

	console.log(getCheckPointQuery+" QUERY");

	mysql.fetchData(function(err, results)
			{
		if (err) 
		{
			throw err;
		} 
		else
		{
			if (results.length > 0) 
			{
				console.log("getting data");

				var response = {
						statusCode  : 200,
						statusObject : results,
						statusMessage : "Valid Data"
				};

				callback(null, results);
			}
			else
			{
				console.log("InValid Data");

				var responseError = {
						statusCode  : 202,
						statusObject : results,
						statusMessage : "InValid Data"
				};

				callback(null, responseError);
			}
		}
			}, getCheckPointQuery);
};

exports.getCheckPoint = function(message,callback)
{
	var TABLE_NAME = 'check_point';
	var check_point_id = message.check_point_id;

	var getCheckPointQuery = "select buidling_id, client_id, start_latitude, end_latitude, start_longitude, end_longitude, time_from_start_to_end from "+TABLE_NAME+" "+
	"where check_point_id = "+check_point_id+";";

	mysql.fetchData(function(err, results)
			{
		if (err) 
		{
			throw err;
		} 
		else
		{
			if (results.length > 0) 
			{
				console.log("getting data");

				var response = {
						statusCode  : 200,
						statusObject : results,
						statusMessage : "Valid Data"
				};

				callback(null, response);
			}
			else
			{
				console.log("InValid Data");

				var responseError = {
						statusCode  : 202,
						statusObject : results,
						statusMessage : "InValid Data"
				};

				callback(null, responseError);
			}
		}
			}, getCheckPointQuery);
};

exports.getCheckPointInfo = function(message,callback)
{
	var TABLE_NAME = 'check_point';
	var check_point_id = message.check_point_id;

	var getCheckPointQuery = "select guard_id, buidling_id, client_id, start_latitude, end_latitude, start_longitude, end_longitude, time_from_start_to_end from "+TABLE_NAME+" "+
	"where check_point_id = "+check_point_id+";";

	mysql.fetchData(function(err, results)
			{
		if (err) 
		{
			throw err;
		} 
		else
		{
			if (results.length > 0) 
			{
				console.log("getting data");

				var response = {
						statusCode  : 200,
						statusObject : results,
						statusMessage : "Valid Data"
				};

				callback(null, response);
			}
			else
			{
				console.log("InValid Data");

				var responseError = {
						statusCode  : 202,
						statusObject : results,
						statusMessage : "InValid Data"
				};

				callback(null, responseError);
			}
		}
			}, getCheckPointQuery);
};
