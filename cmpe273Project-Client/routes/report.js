var ejs = require("ejs");
var msg_payload="";
var mq_client = require('../rpc/client');

exports.report = function(req,res){	
	console.log("finding client_id");
	var msg_payload={"type":"clientInfo"};
	mq_client.make_request('report_queue',msg_payload, function(err,results){
		if (err) {
			console.log("ERROR: " + err.message);	
		} else {
			console.log("Success clientInfo");
			if(results.code == 200)
				{
				var clientId = results.result;
				console.log("success in finding client_id");
				res.render('report',{ clientId: clientId});
				}
			else
				{
				console.log("failure in listReport");
				res.render('index', { title: 'wms' });
				}
				}		
	});
	
};

exports.getbuildingId = function(req,res){	
	console.log("finding building_id");
	var clientId = req.param("input");
	var msg_payload={"clientId": clientId,"type":"buildingInfo"};
	mq_client.make_request('report_queue',msg_payload, function(err,results){
		if (err) {
			console.log("ERROR: " + err.message);	
		} else {
			console.log("Success buildingInfo");
			if(results.code == 200)
				{
				var building_id = results.result;
				console.log("success in finding building_id");
				res.end(building_id.toString());
				}
			else
				{
				console.log("failure in listReport");
				res.render('index', { title: 'wms' });
				}
				}		
	});
	
};


exports.getfilteredReport = function(req,res){	
	console.log("finding filteredReport");
	var clientId = req.param("clientId");
	var buildingId = req.param("input");
	var start = req.param("start");
	var end = req.param("end");
	var search= req.param("search");
	var msg_payload={"clientId": clientId,"buildingId": buildingId,"start":start,"end":end,"search":search,"type":"getfilteredReport"};
	mq_client.make_request('report_queue',msg_payload, function(err,results){
		if (err) {
			console.log("ERROR: " + err.message);	
		} else {
			console.log("Success filteredReport");
			if(results.code == 200)
				{
				var reportInfo = results.result;
				console.log("success in finding reportInfo");
				res.end(reportInfo.toString());
				}
			else
				{
				console.log("failure in listReport");
				res.render('index', { title: 'wms' });
				}
				}		
	});
	
};


