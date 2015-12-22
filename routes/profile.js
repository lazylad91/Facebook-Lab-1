var ejs = require("ejs");
var mysql = require('./mysql');
exports.getEmployee = function(req, res) {
	var sendEmp = "select * from fb_info where user_id=" + req.param("userId");
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results) {
				res.send(results);
			}
		}
	}, sendEmp);

};
exports.getEvents = function(req, res) {
	var sendEvent = "select * from fb_event where user_id=" + req.param("userId");
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results) {
				res.send(results);
			}
		}
	}, sendEvent);

};