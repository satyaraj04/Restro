var express = require("express");
var router  = express.Router();
var passport = require("passport");
var user    = require("../models/user");
router.get("/",function(req,res){
	res.render("landing")
});
// =====
// auth routes
// show register form
router.get("/register",function(req,res){
	res.render("register");
});
// signup logic
router.post("/register",function(req,res){
	user.register(new user({username:req.body.username}),req.body.password,function(err,user){
		if(err){
			return res.render("register",{"error":err.message})
		}
			passport.authenticate("local")(req,res,function(){
				req.flash("success","Hey " + user.username);
				res.redirect("/campgrounds");
			});
	});
});
// login form
router.get("/login",function(req,res){
	res.render("login");
});
// login logic
router.post("/login",passport.authenticate("local",{
	successRedirect:"/campgrounds",
	failureRedirect:"/login"
}),function(req,res){
	
});
// logout logic 
router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","Logged You Out!");
	res.redirect("/campgrounds");
});

module.exports=router;