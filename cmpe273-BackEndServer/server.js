var amqp = require('amqp')
, util = require('util');

var checkpoint = require('./services/checkpoint');
var schedule = require('./services/schedule');
var buildingServer = require('./services/buildingServer');
var clientServer = require('./services/clientServer');
var MySignIn = require('./services/MySignIn');
var MySignUp = require('./services/MySignUp');
var guard = require('./services/guard');
var reportModule = require('./services/reportModule');
var alertModule = require('./services/alertModule');
var redis = require('./services/redis');

var cnn = amqp.createConnection({host:'127.0.0.1'});

cnn.on('ready', function(){
	console.log("listening on login_queue");

	cnn.queue('check_point_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));

			if(message.method === "addCheckPoint")
			{
				checkpoint.addCheckPoint(message, function(err,res){
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.method === "updateCheckPoint")
			{
				checkpoint.updateCheckPoint(message, function(err,res){
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.method === "removeCheckPoint")
			{
				checkpoint.removeCheckPoint(message, function(err,res){
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.method === "getCheckPointForBuilding")
			{
				checkpoint.getCheckPointForBuilding(message, function(err,res){
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.method === "getCheckPoint")
			{
				checkpoint.getCheckPoint(message, function(err,res){
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.method === "getCheckPointInfo")
			{
				checkpoint.getCheckPointInfo(message, function(err,res){
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.method === "getCheckPointForGuard")
			{
				checkpoint.getCheckPointForGuard(message, function(err,res){
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			
		});
	});

	cnn.queue('schedule_queue', function(q){
		console.log("listening on schedule_queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			if(message.service==="search")
			{
				schedule.search_request(message, function(err,res){
					console.log("listening on");
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			if(message.service==="add")
			{
				schedule.add_request(message, function(err,res){
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}//if ends
			if(message.service==="edit")
			{
				schedule.edit_request(message, function(err,res){
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			if(message.service==="delete")
			{
				schedule.delete_request(message, function(err,res){
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
		});
	});

	cnn.queue('building_queue', function(q){
		console.log("listening on building_queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			if(message.service==="searchBuild")
			{
				buildingServer.search_request(message, function(err,res){
					console.log("listening on");
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.service==="addBuilding")
			{
				buildingServer.add_request(message, function(err,res){
					console.log("listening on");
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.service==="edit")
			{
				buildingServer.edit_request(message, function(err,res){
					console.log("listening on");
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.service==="delete")
			{
				buildingServer.delete_request(message, function(err,res){
					console.log("listening on");
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.service==="getBuildingDetails")
			{
				buildingServer.getBuildingDetails(message, function(err,res){
					console.log("listening on");
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.service==="clientbuild")
			{
				buildingServer.clientbuild(message, function(err,res){
					console.log("listening on");
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
		});
	});

	cnn.queue('sign_queue', function(q){
		console.log("listening on sign_queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			if(message.service==="signin")
			{
				MySignIn.signIn_request(message, function(err,res){
					console.log("listening on");
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.service==="signup")
			{
				MySignUp.signUp_request(message, function(err,res){
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
		});
	});


	cnn.queue('client_queue', function(q){
		console.log("listening on building_queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			if(message.service==="search")
			{
				clientServer.search_request(message, function(err,res){
					console.log("listening on");
					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.service==="add")
			{
				clientServer.add_request(message, function(err,res){
					console.log("listening on");
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.service==="edit")
			{
				clientServer.edit_request(message, function(err,res){
					console.log("listening on");
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.service==="delete")
			{
				clientServer.delete_request(message, function(err,res){
					console.log("listening on");
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.service==="getAllClients")
			{
				clientServer.getAllClients(message, function(err,res){
					redis.cacheClients(JSON.stringify(res));
					console.log("listening on");
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
		});
	});

	cnn.queue('guard_queue', function(q){
		console.log("listening on building_queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));

			if(message.method === "addGuard"){
				guard.addGuard(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.method === "updateGuard"){

				guard.updateGuard(message, function(err,res){

					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.method === "deleteGuard"){

				guard.deleteGuard(message, function(err,res){
					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});

			}
			else if(message.method === "displayGuard"){

				guard.displayGuard(message, function(err,res){
					redis.cacheGuards(JSON.stringify(res));
					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});

			}
			else if(message.method === "getGuard"){

				guard.getGuard(message, function(err,res){
					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});

			}
			else if(message.method === "getAllGuards"){

				guard.getAllGuards(message, function(err,res){
					
					//return index sent
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});

			}
			else if(message.method === "assignGuard"){

				guard.assignGuard(message, function(err,res){

					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if (message.method === "getClientAndBuilding") {

				guard.getClientAndBuilding(message, function(err, res) {

					cnn.publish(m.replyTo, res, {
						contentType : 'application/json',
						contentEncoding : 'utf-8',
						correlationId : m.correlationId
					});
				});

			}
			else if (message.method === "getGuardLocation") {

				guard.getGuardLocation(message, function(err, res) {

					cnn.publish(m.replyTo, res, {
						contentType : 'application/json',
						contentEncoding : 'utf-8',
						correlationId : m.correlationId
					});
				});

			}
		});
	});

	cnn.queue('create_alert_q', function(q){
		console.log("listening on create_alert_q");
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			alertModule.create_alert(message, function(err,res){
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});

	cnn.queue('list_alert_q', function(q){
		console.log("listening on list_alert_q");
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			alertModule.list_alert(message, function(err,res){
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});
	
	cnn.queue('custom_queue_alert', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			
			if(message.service == "get_alert")
			{
				alertModule.get_alert(message, function(err,res){
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.service == "create_alert")
			{
				alertModule.create_alert(message, function(err,res){
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
		});
	});

	cnn.queue('report_queue', function(q){
		console.log("listening on report_queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			if(message.type=="reportInfo")
			{
				reportModule.reportInfo(message, function(err,res){
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}	
			else if(message.type=="clientInfo")
			{
				reportModule.clientInfo(message, function(err,res){
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.type=="buildingInfo")
			{
				reportModule.buildingInfo(message, function(err,res){
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}

			else if(message.type=="getfilteredReport")
			{
				reportModule.getfilteredReport(message, function(err,res){
					cnn.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}


		});
	});
});