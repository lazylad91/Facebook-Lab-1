var ejs = require("ejs");
var mysql = require('./mysql');
exports.getFriendStatus = function(req, res) {
	var logInUserId, profUserId;
	if (req.session) {
		logInUserId = req.session.data[0].user_id;
	} else {
		// logout code will go here
	}
	profUserId = req.param("userId");
	if (logInUserId == profUserId) {
		console.log("executing this");
		result = {
			"same" : "true",
			"pending" : "false",
			"friends" : "false",
			"add" : "false"
		};
		res.send(result);
	}
	var checkAddFriend = "select * from fb_friend where (user_id="
			+ logInUserId + " and friend_user_id=" + profUserId
			+ ") or (user_id=" + profUserId + " and friend_user_id="
			+ logInUserId + ")";
	console.log("query is" + checkAddFriend);
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results.length == 2) {
				result = {
					"same" : "false",
					"pending" : "false",
					"friends" : "true",
					"add" : "false"
				};
				res.send(result);
			}

		}
	}, checkAddFriend);
	var checkPendingFriend = "select * from fb_pending where pending_user_id="
			+ logInUserId + " and 	pending_friend_id=" + profUserId;
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results.length > 0) {
				result = {
					"same" : "false",
					"pending" : "true",
					"friends" : "false",
					"add" : "false"
				};
				res.send(result);
			} else {

				result = {
					"same" : "false",
					"pending" : "false",
					"friends" : "false",
					"add" : "true"
				};
				res.send(result);

			}
		}
	}, checkPendingFriend);
};

exports.sendFriendRequest = function(req, res) {
	var logInUserId, profUserId;
	if (req.session) {
		logInUserId = req.session.data[0].user_id;
	} else {
		// logout code will go here
	}
	profUserId = req.param("userId");

	var sendFrndReq = "insert into fb_pending  (pending_user_id,pending_friend_id) values ("
			+ logInUserId + "," + profUserId + ")";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results) {
				result = {
					"same" : "false",
					"pending" : "true",
					"friends" : "false",
					"add" : "false"
				};
				res.send(result);
			}
		}
	}, sendFrndReq);
};

exports.getPending = function(req, res) {

	user_id = req.param("userId");

	var getPending = "select first_name,user_id from fb_user where user_id in (select pending_user_id from fb_pending where pending_friend_id="
			+ user_id + ")";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results) {
				res.send(results);
			}
		}
	}, getPending);
};

exports.acceptReq = function(req, res) {

	user_id = req.param("userId");
	friend_id = req.param("friendId");
	var acceptReq = "insert into fb_friend (user_id,friend_user_id) values  ("
			+ user_id + "," + friend_id + ")" +"," +"("
					+ friend_id + "," + user_id + ")";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results) {
            var delPending = "delete from fb_pending where pending_friend_id="+user_id+ " and pending_user_id="+friend_id ;
				mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					} else {
						if (results) {
							res.send(results);
						}
					}
				}, delPending);
			}
		}
	}, acceptReq);
};

exports.getFriend = function(req,res){


	user_id = req.param("userId");
	friend_id = req.param("friendId");
	var getFriend = "select user_id,first_name from fb_user where user_id in (select friend_user_id from fb_friend where user_id="
		+ user_id + ")";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results) {
				res.send(results);
			}
		}
	}, getFriend);

}