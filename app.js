var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose"),
	flash = require("connect-flash"),
	passport = require("passport"),
	localstrategy = require("passport-local"),
	methodOverride = require("method-override"),
	Campground = require("./models/campgrounds"),
	Comment = require("./models/comments"),
	user   = require("./models/user"),
	seeddb = require("./seeds");
var campgroundsroutes = require("./routes/campgrounds"),
	commentsroutes    = require("./routes/comments"),
	authroutes        = require("./routes/auth");
	
mongoose.connect("mongodb+srv://Pranav:pranav@2001@pranav.dlq3w.mongodb.net/vidGame_app?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"));
app.use(flash());
// seeddb();  seed the database
// passport configuration
app.use(require("express-session")({
	secret:"persona 5 foh life",
	resave:false,
	saveUninitialized:false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
app.use(function(req,res,next){
	res.locals.currentuser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});
app.use(campgroundsroutes);
app.use(commentsroutes);
app.use(authroutes);
app.listen(process.env.Port || 3000,process.env.IP,function(){
	console.log("server has started");
});
