// middle middleware
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
var middlewareObj =  {};
middlewareObj.checkingauthorization = function checkingauthorization(req,res,next){
	if(req.isAuthenticated()){
	Campground.findById(req.params.id,function(err,foundcampground){
		if(err){
			req.flash("error","campground not found")
			res.redirect("back")
		}else{
				// 	does the user created that respective campground?
			if(foundcampground.author.id.equals(req.user._id)){
				next();
			}else{
				req.flash("error","You Do Not Have Permission To Do That");
				res.redirect("back");
			}
		}
	});
	}else{
		req.flash("error","you need to logged in");
		res.redirect("back");
	}
}
middlewareObj.checkingauthorizationcomments = function checkingauthorizationcomments(req,res,next){
	if(req.isAuthenticated()){
	Comment.findById(req.params.comment_id,function(err,foundcomment){
		if(err){
			res.redirect("back")
		}else{
				// 	does the user created that respective comment?
			if(foundcomment.author.id.equals(req.user._id)){
				next();
			}else{
				req.flash("error","you dont have permission to do that")
				res.redirect("back");
			}
		}
	});
	}else{
		req.flash("error","you need to login to do that")
		res.redirect("back");
	}
}
middlewareObj.isloggedin = function isloggedin(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
		req.flash("error","Login First!")
	    res.redirect("/login");
}
module.exports = middlewareObj