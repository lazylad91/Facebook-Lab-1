var ejs = require("ejs");
var mysql = require('./mysql');
exports.getGroup = function(req, res) {
	var userId = req.param("userId");

	var getGroup = "select * from fb_group_user where (user_id=" + userId + ")";
	console.log("query is" + getGroup);
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results.length > 0) {
				res.send(results);
			}

		}
	}, getGroup);
};


exports.createGroup = function(req, res) {
	var userId, grpName, grpDesc, adminName;
	userId = req.param("userId");
	grpName = req.param("grpName");
	grpDesc = req.param("grpDesc");
	adminName = req.param("adminName");
	var insertGroup = "insert into fb_group (group_desc,group_name,group_admin_name,group_admin_id) values ('"
			+ grpDesc
			+ "','"
			+ grpName
			+ "','"
			+ adminName
			+ "','"
			+ userId
			+ "')";
	console.log(insertGroup);
	mysql
			.fetchData(
					function(err, results) {
						if (err) {
							throw err;
						} else {
							if (results) {

								var insertGroupUser = "insert into fb_group_user (group_id,user_id,admin,group_name,group_desc) select group_id,"
										+ "'"
										+ userId
										+ "'"
										+ ","
										+ "'"
										+ "true"
										+ "'"
										+ ","
										+ "'"
										+ grpName
										+ "'"
										+ ","
										+ "'"
										+ grpDesc
										+ "'"
										+ " from fb_group where group_name='"
										+ grpName + "'";
								mysql
										.fetchData(
												function(err, results) {
													if (err) {
														throw err;
													} else {
														if (results) {
															var getGroup = "select * from fb_group_user where (user_id="
																	+ userId
																	+ ")";
															console
																	.log("query is"
																			+ getGroup);
															mysql
																	.fetchData(
																			function(
																					err,
																					results) {
																				if (err) {
																					throw err;
																				} else {
																					if (results.length > 0) {
																						res
																								.send(results);
																					}

																				}
																			},
																			getGroup);

														}

													}
												}, insertGroupUser);

							}

						}
					}, insertGroup);
};

exports.delGroup = function(req, res) {
	var groupId = req.param("groupId");
	var userId = req.param("userId");
	var delGroup = "delete  from fb_group_user where (group_id='" + groupId
			+ "')";
	console.log("query is" + delGroup);
	mysql
			.fetchData(
					function(err, results) {
						if (err) {
							throw err;
						} else {
							var delGroupMain = "delete  from fb_group where group_id="
									+ groupId;
							if (results) {
								mysql
										.fetchData(
												function(err, results) {
													if (err) {
														throw err;
													} else {
														if (results) {

															var getGroup = "select * from fb_group_user where user_id="
																	+ userId;
															if (results) {
																mysql
																		.fetchData(
																				function(
																						err,
																						results) {
																					if (err) {
																						throw err;
																					} else {
																						if (results) {
																							res
																									.send(results);
																						} else {
																							res
																									.send(results);
																						}

																					}
																				},
																				getGroup);
															}
															;

														}

													}
												}, delGroupMain);
							}
							;

						}
					}, delGroup);
};

exports.getGroupFromId = function(req, res) {

	var groupId = req.param("groupId");

	var getGroup = "select * from fb_group where (group_id=" + groupId + ")";
	console.log("query is" + getGroup);
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results.length > 0) {
				res.send(results);
			}

		}
	}, getGroup);
};
exports.getMember = function(req, res) {

	var groupId = req.param("groupId");
	var getMember = "select b.group_user_id, b.group_id, b.user_id, b.admin, a.first_name  from mydb.fb_user a ,mydb.fb_group_user b where a.user_id =  b.user_id and group_id ="
			+ groupId;
	console.log("query is" + getMember);
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results) {
				res.send(results);
			}

		}
	}, getMember);
};

exports.delMember = function(req, res) {

	var userId = req.param("userId");
	var groupId = req.param("groupId");
	var delMember = "delete FROM mydb.fb_group_user where user_id=" + user_id
			+ " and group_id=" + groupId;
	console.log("query is" + delMember);
	mysql
			.fetchData(
					function(err, results) {
						if (err) {
							throw err;
						} else {
							if (results) {
								var getMember = "select b.group_user_id, b.group_id, b.user_id, b.admin, a.first_name  from mydb.fb_user a ,mydb.fb_group_user b where a.user_id =  b.user_id and group_id ="
									+ groupId;
								console.log("query is" + getMember);
								mysql.fetchData(function(err, results) {
									if (err) {
										throw err;
									} else {
										if (results) {
											res.send(results);
										}

									}
								}, getMember);
							}

						}
					}, delMember);
};

exports.addMember = function(req, res) {
	var groupId = req.param('groupId');
	var usrName = req.param('usrName');
	var addMember = "insert into fb_group_user (group_id,user_id,admin) select "
			+ groupId
			+ ", user_id "
			+ ",false from fb_user where first_name="
			+ "'" + usrName + "'";
	console.log("query is" + addMember);
	mysql
			.fetchData(
					function(err, results) {
						if (err) {
							throw err;
						} else {
							if (results) {

								var getMember = "select b.group_user_id, b.group_id, b.user_id, b.admin, a.first_name  from mydb.fb_user a ,mydb.fb_group_user b where a.user_id = b.user_id and group_id ="
									+ groupId;
								console.log("query is" + getMember);
								mysql.fetchData(function(err, results) {
									if (err) {
										throw err;
									} else {
										if (results) {
											res.send(results);
										}

									}
								}, getMember);

							}

						}
					}, addMember);
};