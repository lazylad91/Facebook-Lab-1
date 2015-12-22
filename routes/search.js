var ejs = require("ejs");
var mysql = require('./mysql');
exports.searchUser = function(req, res) {

	var getUser = "select * from fb_user where first_name like '"
			+ req.param("searchText")+"%'";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results) {
				res.send(results);
			}
		}
	}, getUser);


};

