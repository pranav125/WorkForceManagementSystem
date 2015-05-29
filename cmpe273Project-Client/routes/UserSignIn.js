var ejs = require("ejs");

var mq_client = require('../rpc/client');

function signin(req,res)
{
	var username = req.param('username');
	var password = req.param('password');
	var msg_payload = {"username":username,"password":password,"service":"signin"};

	mq_client.make_request('sign_queue', msg_payload,function(err,response){
		if(err){
			throw err;
		} 
		else
		{


			if(response.role == "guard"){
				console.log("GUARD ID :: "+response.results[0].guard_id);
				req.session.guard_id=response.results[0].guard_id;
				console.log(req.session.guard_id);
				res.send({"signin":"Success","role":"guard"});
			}
			else
			{
				req.session.username=response.results[0].username;
				req.session.prof=response.results[0].user_id;
				req.session.check=response.results[0].password;
				console.log(JSON.stringify(response));

				res.send({"signin":"Success","role":"admin"});
			}

		}
	});

}

function signup(req,res)
{
	console.log("signup enteredc"); 
	var username = req.param('username');
	var password = req.param('password');
	var guard_id = req.param('guard_id');
	var role ="guard";// req.param('role');
	//var lname = req.param('lname');
	//var email = req.param('email');

	var msg_payload = {"username":username,"password":password, "role":role,"guard_id":guard_id, "service":"signup"};
	//console.log(msg_payload);
	mq_client.make_request('sign_queue', msg_payload,function(err,response){
		if(err){
			console.log(err);
			throw err;
		} 
		else
		{
			res.render("clients");
//			if(response.code=="200")
//			{
//			req.session.username = response.username;
//			req.session.check = response.password;
//			req.session.prof = response.prof;
//			console.log(response.prof);
//			res.send("goToClientsHome");
//			}
//			else
//			{
//			res.send("goToClientsHome");
//			}
		}
	});

}

exports.redirectToSignUp = function(req,res){
	res.render("signup",{"title":"Workforce Management System"});
};

exports.signin = signin;
exports.signup = signup;