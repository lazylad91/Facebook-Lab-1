var ejs = require("ejs");
var mysql = require('./mysql');
exports.savePost = function(req, res) {
	var insertPost = "insert into fb_post (user_id,user_name,post_desc) values ('"
			+ req.param("userId")
			+ "','"
			+ req.param("firstName")
			+ "','"
			+ req.param("post") + "')";
	console.log("query is" + insertPost);
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results) {
				console.log("data inserted");
				var sendPost = "select * from fb_post where user_id="
						+ req.param("userId")+" order by post_time DESC";
				mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					} else {
						if (results) {
							res.send(results);
						}
					}
				}, sendPost);

			}
		}
	}, insertPost);
};

exports.getPost=function(req,res){

	console.log("data inserted");
	var sendPost = "select * from fb_post where user_id in (select "+req.param("userId")+ " as user_id from fb_friend UNION select friend_user_id from fb_friend where user_id="+req.param("userId")+")" + " order by post_time DESC";
	console.log("quwey"+sendPost);
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results) {
				res.send(results);
			}
		}
	}, sendPost);


}

