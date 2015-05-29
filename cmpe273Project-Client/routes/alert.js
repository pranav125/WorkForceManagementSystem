var ejs = require("ejs");
var mq_client = require('../rpc/client');

exports.list_alert= function (request,response)
{
    var msg_payload = {"service":"list_alert"};
    mq_client.make_request('list_alert_q',msg_payload, function(err,results){
        if (err) {
            console.log("ERROR: " + err.message);
        } else {
            console.log("Success Find");
            if(results.length>0)
            {
                //var result = results.value;        // you may need to parse the value
                console.log(results);
                response.send(results);                // render something
            }
            else
            {
                console.log("failure in getting alert");
            }
        }
    });
};

exports.create_alert = function(request, response) {
    var alert1 = request.param("alert");
    var severity = request.param("severity");
    var status = request.param("status");
    var client_id_fk= request.param("client_id_fk");
    var building_id_fk = request.param("building_id_fk");
    var guard_id = request.session.guard_id;   
    //create session variable
//    request.session.userName=first_name;
 //   request.session.email =  email_id;
   // var uid = request.session.email;

    var msg_payload = { 
            "alert": alert1, 
            "severity": severity,
            "status":status,
            "client_id_fk":client_id_fk,
            "building_id_fk": building_id_fk,
            "guard_id_fk": guard_id
    };

    //rpc call
    mq_client.make_request('create_alert_q',msg_payload, function(err,results){
        if (err) {
            console.log("ERROR: " + err.message);

        } else {
            console.log("Success find");
            if(results.code == 200)
            {
                console.log("success in creating alert");
                //response.redirect('/createProfile');
            }
            else
            {
                console.log("failure in creating alert");
                //response.render('index', { title: 'LinkedInPrototype' });
            }
        }

    });
};

exports.get_alert= function (request,response)
{
	var res = {};
	var msg_payload = {"guard_id":request.session.guard_id,"service":"get_alert"};
	mq_client.make_request('custom_queue_alert',msg_payload, function(err,results){
		if (err) {
			console.log("ERROR: " + err.message);

		} else {
			console.log("Success find");
			if(results.length>0)
			{
				// you may need to parse the value
				console.log(results);
				console.log("success in getting alert");
				response.send(results);				// render something
			}
			else
			{
				console.log("failure in getting alert");
			}
		}

	});
};



exports.alert = function(req,res){
    
    res.render('alert', { title: 'Express' });
    
}
