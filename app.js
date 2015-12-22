/**
 * Module dependencies.
 */

var express = require('express'),
         routes = require('./routes'), 
         home = require('./routes/home'), 
session = require('client-sessions'), 
search = require('./routes/search'), 
group = require('./routes/group');
friend = require('./routes/friend'), 
profile = require('./routes/profile'), 
user = require('./routes/user'),
mysql=require('./routes/mysql'),
info = require('./routes/info'), 
errorhandler= require('errorhandler'),
connect = require('connect'),
regis = require('./routes/regis'), 
http = require('http'), 
path = require('path');

var app = express();
app.use(session({   
    cookieName: 'session',    
	secret: 'shoppingcart',    
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,  }));

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(function(err, req, res, next) {/*
		  console.error(err.stack);
		  if(req.session)
		  res.render('../views/login.ejs');
		  else{
			  res.status(500);
			  res.render('error', { error: "Something is broke we are working on  it, Thanks For your patience"  });
		  }
		*/
		res.render('../views/error.ejs');
	});
	app.use(express.static(path.join(__dirname, 'public')));
});




app.configure('development', function() {
	app.use(express.errorHandler());
});

app.get('/', function(req, res) {
	res.render("../views/login.ejs");
});
app.post('/insertEduEmp', info.saveEdu);
app.post('/insertEvent', info.saveEvent);
app.post('/signUp', regis.signUp);
app.post('/insertPost', home.savePost);
app.post('/checkPassword', regis.signIn);
app.get('/users', user.list);
app.get('/getEmployees', profile.getEmployee);
app.get('/getEvents', profile.getEvents);
app.get('/searchUser', search.searchUser);
app.get('/getFriendStatus', friend.getFriendStatus);
app.get('/getMember',group.getMember);
app.get('/delMember',group.delMember);
app.get('/getPost',home.getPost);
app.get('/addMember',group.addMember);
app.get('/getPending', friend.getPending);
app.get('/getFriend', friend.getFriend);
app.get('/getGroupPage', function(req, res) {
	console.log("yaay"+req.param('groupId'));
	res.render("../views/groupPage.ejs", {
		data : req.session.data, groupId: req.param('groupId')
	});
});
app.get('/getGroupFromId',group.getGroupFromId);
app.get('/Group', function(req, res) {
	res.render("../views/group.ejs", {
		data : req.session.data
	});
});
app.get('/signOut', function(req, res) {
	req.session.destroy();
	res.clearCookie('session');
	res.render("../views/logIn.ejs");
});
app.get('/getGroup', group.getGroup);
app.get('/delGroup',group.delGroup);
app.get('/createGroup',group.createGroup);
app.get('/enterInfo', function(req, res) {
	console.log(req.session.data);
	res.render('../views/enterInfo.ejs', {
		data : req.session.data
	});
});
app.get('/sendFriendRequest', friend.sendFriendRequest);
app.get('/acceptReq', friend.acceptReq);
app.get('/enterInfo', function(req, res) {
	console.log(req.session.data);
	res.render('../views/enterInfo.ejs', {
		data : req.session.data
	});
});
app.get('/profile', function(req, res) {
	console.log(req.session.data);
	res.render('../views/profilePage.ejs', {
		data : req.session.data
	});
});
app.get('/othersProfile', function(req, res) {
	console.log("inside");
	res.render('../views/profilePage.ejs', {
		data : [ {
			"user_id" : req.param('user_id'),
			"first_name" : req.param('first_name'),
			"last_name" : req.param('last_name'),
			"email" : req.param('email'),
			"phone_no" : req.param('phone_no'),
			"dob" : req.param('dob')
		} ]
	});
});


http.createServer(app).listen(app.get('port'), function() {
	console.log("Express server listening on port " + app.get('port'));
	mysql.createPool();
	mysql.getDetails(); 
});
