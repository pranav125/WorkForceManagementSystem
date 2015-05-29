var con = require("./mysql.js");
var crypto = require("crypto");
function signIn_request(msg,callback)
{
	var res = {};
	console.log("In handle request heryyyyy:"+ msg.username);
	var qsi = "select * from user where username = '"+msg.username+"'";
	console.log("Query is:"+qsi);
	con.fetchData(function(err,result){
		if(err)
		{

			console.log(err);

		}
		else
		{
			if(result.length>0)
			{
				var salt = result[0].salt;
				var inpass = msg.password;

				var password = crypto.pbkdf2Sync(inpass, salt, 10000, 128,'sha256').toString('base64');

				var qsi1 = "select * from user where username='"+msg.username+"' and password='"+password+"'";

				con.fetchData(function(err,result1){
					if(err)
					{
						console.log(err);
					}
					else
					{
						if(result1.length>0)
						{
							var d = new Date();
							var date = d.getDate();
							var month = d.getMonth() + 1;
							var year = d.getFullYear();
							var fd = month + "/" + date + "/" + year ;
							var qlog = "update user set last_logged_in='"+fd+"' where username ='"+msg.username+"'";
							con.insertData(function(err,result2){
								if(err){
									console.log(err);
								}
								else
								{

									if(result1[0].role == "guard")
									{
										var qsi2 = "select * from guard where user_id_fk="+result1[0].user_id+";";
										con.fetchData(function(err,result2){
											if(err)
											{
												console.log(err);
											}
											else
											{
												if(result2.length>0)
												{
													res.signin='Success';
														
													console.log("login guard test"+result2.length);
													var response = {
														role : "guard",
														results : result2
													};
													
													callback(null,response);
												}
												else
												{
													console.log("password no match");
												}

											}

										},qsi2);
									}
									else{
										var responseAdmin = {
												role : "admin",
												results : result1
											};
											
											callback(null,responseAdmin);
									}

								}

							},qlog);




						}
						else
						{
							console.log("password no match");
						}

					}

				},qsi1);
			}
			else
			{
				console.log("username no match");
			}


		}


	},qsi);

}

exports.signIn_request = signIn_request ;