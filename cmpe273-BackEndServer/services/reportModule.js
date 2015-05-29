var mysqlQuery = require("./dbConnectivity/mysqlQuery");
var sqlstmt;

exports.clientInfo= function(msg,callback)
{
	var res={};
	console.log("---clientInfo---");
	sqlstmt= "select client_id,client_name from client";	
	mysqlQuery.execQuery(sqlstmt,function(err, rows, fields){
		if (err) {
			console.log("Error in db");
			throw err;	
	        }else
	        {
	        	if(rows.length > 0)
	        		{    		
	        		var result = JSON.parse(JSON.stringify(rows));
	        		res.result= result;
	        		res.code=200;
	    			callback(null, res);
	        		}
	        }	
	});	
};

exports.buildingInfo= function(msg,callback)
{
	var res={};
	console.log("---buildinInfo---");
	sqlstmt= "select building_id,building_name from building where client_id_fk=?";
	var params =[msg.clientId];
	mysqlQuery.execQuery(sqlstmt,params,function(err, rows, fields){
		if (err) {
			console.log("Error in db");
			throw err;	
	        }else
	        {
	        	if(rows.length > 0)
	        		{    		
	        		var result = JSON.stringify(rows);
	        		res.result= result;
	        		res.code=200;
	    			callback(null, res);
	        		}
	        }	
	});	
};


exports.getfilteredReport= function(msg,callback)
{
	var res={};
	var params;
	console.log("---getfilteredReport---");
	var clientId = msg.clientId;
	var buildingId = msg.buildingId;
	var start=msg.start;
	var end = msg.end;
	var search = msg.search;
	console.log(search);
	if(clientId=="")
		{
		if(start==""|| end=="")
		{
			if(search=="")
				{
				sqlstmt = "select * from alert a, building b,client c where b.building_id=a.building_id_fk and c.client_id=a.client_id_fk";

				//sqlstmt= "select * from alert";
				params=[];
				}
			else{
				
				sqlstmt = "select * from alert a, building b,client c where b.building_id=a.building_id_fk and c.client_id=a.client_id_fk and alert like '%"+search+"%'";


				//sqlstmt= "select * from alert where alert like '%"+search+"%' ";
				params=[];
			}	
		}
	else
		{
				if(search=="")
					{
					sqlstmt = "select * from alert a, building b,client c where b.building_id=a.building_id_fk and c.client_id=a.client_id_fk and date >= ? and date <= ?";

						//sqlstmt= "select * from alert where date >= ? and date <= ?";
						params=[start,end];
					}
				else
				{
					
					sqlstmt = "select * from alert a, building b,client c where b.building_id=a.building_id_fk and c.client_id=a.client_id_fk and date >= ? and date <= ? and alert like '%"+search+"%'";

			//	sqlstmt= "select * from alert where date >= ? and date <= ? and alert like '%"+search+"%'";
				params =[start,end];
				}
				
		}
		}
	else if(buildingId=="Select")
		{
		if(start==""|| end=="")
		{
			if(search=="")
				{
				sqlstmt = "select * from alert a, building b,client c where b.building_id=a.building_id_fk and c.client_id=a.client_id_fk and b.client_id_fk=?";

					//sqlstmt= "select * from alert where client_id_fk=?";
					params=[clientId];
				}
			else{
				sqlstmt = "select * from alert a, building b,client c where b.building_id=a.building_id_fk and c.client_id=a.client_id_fk and b.client_id_fk=? and alert like '%"+search+"%'";

				//sqlstmt= "select * from alert where client_id_fk=? and alert like '%"+search+"%' ";
				params=[clientId];
			}	
		}
	else
		{
				if(search=="")
					{
					sqlstmt = "select * from alert a, building b,client c where b.building_id=a.building_id_fk and c.client_id=a.client_id_fk and b.client_id_fk=? and date >= ? and date <= ?";

						//sqlstmt= "select * from alert where client_id_fk=? and date >= ? and date <= ?";
						params=[clientId,start,end];
					}
				else
				{
					
					sqlstmt = "select * from alert a, building b,client c where b.building_id=a.building_id_fk and c.client_id=a.client_id_fk and b.client_id_fk=? and date >= ? and date <= ? and alert like '%"+search+"%'";

			//	sqlstmt= "select * from alert where client_id_fk=? and date >= ? and date <= ? and alert like '%"+search+"%'";
				params =[clientId,start,end];
				}
				
		}
		}
	else{
		
		if(start==""|| end=="")
		{
			if(search=="")
				{
				sqlstmt = "select * from alert a, building b,client c where b.building_id=a.building_id_fk and c.client_id=a.client_id_fk and b.client_id_fk =? and b.building_id=?" ;

				//	sqlstmt= "select * from alert where client_id_fk=? and building_id_fk=?";
					params=[clientId, buildingId];
				}
			else{
				
				sqlstmt = "select * from alert a, building b,client c where b.building_id=a.building_id_fk and c.client_id=a.client_id_fk and b.client_id_fk =? and b.building_id=? and alert like '%"+search+"%'";

				//sqlstmt= "select * from alert where client_id_fk=? and building_id_fk=? and alert like '%"+search+"%' ";
				params=[clientId,buildingId];
			}	
		}
	else
		{
				if(search=="")
					{
					sqlstmt = "select * from alert a, building b,client c where b.building_id=a.building_id_fk and c.client_id=a.client_id_fk and b.client_id_fk =? and b.building_id=? and date >= ? and date <= ?";

					//	sqlstmt= "select * from alert where client_id_fk=? and building_id_fk=? and date >= ? and date <= ?";
						params=[clientId,buildingId,start,end];
					}
				else
				{
					
					sqlstmt ="select * from alert a, building b,client c where b.building_id=a.building_id_fk and c.client_id=a.client_id_fk and b.client_id_fk =? and b.building_id=? and date >= ? and date <= ? and alert like '%"+search+"%'";

				//sqlstmt= "select * from alert where client_id_fk=? and building_id_fk=? and date >= ? and date <= ? and alert like '%"+search+"%'";
				params =[clientId,buildingId,start,end];
				}
				
		}	
		
	}
		
	mysqlQuery.execQuery(sqlstmt,params,function(err, rows, fields){
		if (err) {
			console.log("Error in db");
			throw err;	
	        }else
	        {
	        	if(rows.length > 0)
	        		{    		
	        		var result = JSON.stringify(rows);
	        		res.result= result;
	        		res.code=200;
	    			callback(null, res);
	        		}
	        }	
	});	
};











