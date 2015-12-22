var ejs = require("ejs");
var mysql = require('./mysql');
exports.signUp = function(req,res){
	   var firstName, lastName, email,phoneNo,password,dob;
	    firstName = req.param("firstName");
	    lastName = req.param("lastName");
	    email = req.param("email");
	    phoneNo = req.param("phoneNo");
	    password = req.param("password");
	    dob = req.param("dob");
	    var insertUser = "insert into fb_user (first_name,last_name,email,phone_no,dob,password) values ('" + firstName+"','"+lastName+"','"+email+"','"+phoneNo+"','"+dob+"','"+password+"')";
        console.log("query is" +insertUser);
	    mysql.fetchData(function(err,results){
	    	if(err){
	    		 throw err;
			}
			else 
			{
				if(results){
					console.log("data inserted");
					res.send("login");
				}
			}
	    },insertUser);
};
exports.signIn = function(req,res){
	var emailPhone = req.param('emailPhone');
	var password = req.param('password');
	var checkPwd = "select * from fb_user where (email='"+emailPhone+"' or phone_no='"+emailPhone+"'"+")"+"and password='"+password+"'";
	console.log(checkPwd);
	mysql.fetchData(function(err,results){
    	if(err){
    		 throw err;
		}
		else 
		{
			if(results.length>0){
				ejs.renderFile('./views/home.ejs', { data: results } , function(err, result) {
			        // render on success
			        if (!err) {
			        	if(req.session){
			        		console.log("hi i am inside");
			            req.session.data=results;
			        	}
			            console.log(req.session.data);
			            res.end(result);
			        }
			        // render or error
			        else {
			        	
			            
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
			else{
				console.log("session destroyed");
				res.redirect('/');
			}
		}
    },checkPwd);
};