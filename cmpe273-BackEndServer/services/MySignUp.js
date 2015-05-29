var con = require('./mysql');
var crypto = require('crypto');

function signUp_request(msg,callback)
{
	console.log("first step");
	console.log("In handle request herrrrreee:"+ msg.username);
	var res = {};
	var q1 = "select user_id from user where username='"+msg.username+"'";
	console.log("Query is:"+q1);
	con.fetchData(function(err,result){
		if(err)
		{
			console.log(err);
		}
		else
		{
			if(result.length>0)
			{
				callback(null,result);
				//res.send({"signup":"Exists"});
			}
			else
			{
				var qmx = "select max(user_id) as user_id from user";
				console.log("Query is:"+qmx);
				con.fetchData(function(err,result1){
					if(err)
					{
						console.log(err);
					}
					else
					{
						if(result1.length>0)
						{
							var salt =  crypto.randomBytes(64).toString('base64');
							var pass = crypto.pbkdf2Sync(msg.password, salt, 10000, 128,'sha256').toString('base64');
							var qins = "insert into user(username, password, role, salt) values ('"+msg.username+"', '"+pass+"', '"+msg.role+"','"+salt+"')";
							console.log("Query is 2:"+qmx);
							con.insertData(function(err,result2){
								if(err)
								{
									console.log(err);
								}
								else
								{
									console.log(result1[0].user_id+" MAX USER_ID");
									var next_user_id = result1[0].user_id + 1;
									var updateQuery = "update guard set user_id_fk = "+next_user_id+" where guard_id='"+msg.guard_id+"';";								   res.username = msg.username;

									con.fetchData(function(err,result){
										if(err)
										{
											console.log(err);
										}
										else
										{
											if(result.affectedRows > 0)
											{

												res.password = pass;
												// res.id = uid;
												res.code = 200;
												res.signup="Success";
												res.signup="Success";
												callback(null,res);
											}
										}
									},updateQuery);
								}

							},qins);
						}
						else
						{
							console.log("uid:1");
							// var userid =1 ;
							var saltPass =  crypto.randomBytes(64).toString('base64');
							var password = crypto.pbkdf2Sync(msg.password, saltPass, 10000, 128,'sha256').toString('base64');
							var signupquery = "insert into user(username, password, role) values ('"+msg.username+"', '"+password+"', '"+msg.role+"','"+saltPass+"')";
							console.log("Query is 1:"+signupquery);
							con.postData(function(err,result2){
								if(err)
								{
									console.log(err);
								}
								else
								{
									console.log("success insert");
									res.username = msg.username;
									res.password = pass;
									// res.id = uid;
									res.signup="Success";
									callback(null,res);
								}

							},signupquery);
						}
					}

				},qmx);
			}
		}



	},q1);

}


exports.signUp_request = signUp_request ;