
var mysqlQuery = require("./dbConnectivity/mysqlQuery");

function list_alert(msg, callback){
	var res = {};
	console.log("In handle request:"+ msg.username);
	var sqlstmt = "select * from alert a, building b,client c where b.building_id=a.building_id_fk and c.client_id=a.client_id_fk;";  

	mysqlQuery.execQuery(sqlstmt,function(err, rows, fields){
		if (err) {
			// throw err;
			console.log("Error in db");
		}else
		{
			if(rows.length > 0)
			{
				console.log("Rows exists");
				res.code="200";
				res.value=rows;
			}
			callback(null, rows);        	
		}	

	});	
}

function get_alert(msg, callback){
	var res = {};
	//console.log("In handle request:"+ msg.username);
	var sqlstmt = "select alert from alert where guard_id_fk = '"+msg.guard_id+"';";  
	console.log("query for get alert" + sqlstmt);
	mysqlQuery.execQuery(sqlstmt,function(err, rows, fields){
		if (err) {
			// throw err;
			console.log("Error in db");
		}else
		{
			if(rows.length > 0)
			{
				console.log("Rows exists");
				res.code="200";
			
			}
			console.log(JSON.stringify(rows));
			callback(null, rows);        	
		}	

	});	
}

function create_alert(msg, callback){
	var res = {};
	var flag=0;
	var space="";
	console.log("Creating alert:"+ msg.alert);
	var sqlstmt="";
	var alert1 = msg.alert;
	var severity = msg.severity;
	var status = msg.status;
	var date = msg.date;
	var client_id_fk=msg.client_id_fk;
	var building_id_fk = msg.building_id_fk;
	var guard_id_fk = msg.guard_id_fk;

	// sql query
	sqlstmt = "insert into alert (alert,severity,status,date,client_id_fk,building_id_fk,guard_id_fk) values ('"+alert1+"','"+severity+"','"+status+"',NOW(),'"+client_id_fk+"','"+building_id_fk+"','"+guard_id_fk+"')";
	mysqlQuery.execQuery(sqlstmt,function(err, result) {
		if (err) {
			console.log("ERROR: " + err.message);
		} else {
			console.log("Success in insertion");		
		}
	});
}

exports.create_alert = create_alert;
exports.list_alert = list_alert;
exports.get_alert = get_alert;
