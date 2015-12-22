var ejs = require("ejs");
var mysql = require('./mysql');
exports.saveEdu = function(req, res) {
	var insertInfo = "insert into fb_info (user_id,from_start,to_end,name,type) values ('"
			+ req.param("userId")
			+ "','"
			+ req.param("from")
			+ "','"
			+ req.param("to")
			+ "','"
			+ req.param("name")
			+ "','"
			+ req.param("empOrEdu") + "')";
	console.log("query is" + insertInfo);
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results) {
				console.log("data inserted");
				var sendInfo = "select * from fb_info where user_id="
						+ req.param("userId");
				mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					} else {
						if (results) {
							res.send(results);
						}
					}
				}, sendInfo);

			}
		}
	}, insertInfo);
};

exports.saveEvent = function(req, res) {
	console.log("In save event");
	var insertEvent = "insert into fb_event (user_id,event_name,event_year) values ('"
			+ req.param("userId")
			+ "','"
			+ req.param("event")
			+ "','"
			+ req.param("yearOfEvent") + "')";
	console.log("query is" + insertEvent);
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results) {
				console.log("data inserted");
				var sendEvent = "select * from fb_event where user_id="
						+ req.param("userId");
				mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					} else {
						if (results) {
							console.log("results are here");
							res.send(results);
						}
					}
				}, sendEvent);

			}
		}
	}, insertEvent);
};