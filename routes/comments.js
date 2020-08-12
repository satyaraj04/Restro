var express = require("express");
var router  = express.Router();
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
var middleware = require("../middleware");
// ============
// comments route
   // ============
router.get("/campgrounds/:id/comments/new",middleware.isloggedin,function(req,res){
// 	find campground by id 
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err)
		}else{
			res.render("comments/new",{campground:campground});
		}
	});
}); 
router.post("/campgrounds/:id/comments",middleware.isloggedin,function(req,res){
// 	look up campgrouds using id
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campgrouds");
		}else{
			Comment.create(req.body.comment,function(err,comment){
			if(err){
				console.log(err);
			}else{
// 				add user name and id to the comment
				comment.author.id = req.user._id;
				comment.author.username = req.user.username;
// 				save comment
				comment.save();
				campground.comments.push(comment);
				campground.save();
				req.flash("success","comment created successfully");
				res.redirect("/campgrounds/" + campground._id);
			}
			});
		}
	});
// 	create new comment
// 	connect it to the campground
// 	redirect to the show page!
});
// comments edit route
router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkingauthorizationcomments,function(req,res){
	Comment.findById(req.params.comment_id,function(err,foundcomment){
	if(err){
		res.redirect("back");
	}else{
		res.render("comments/edit",{campground_id:req.params.id,comment:foundcomment});
	}	
	});
	
});
// comments update route
router.put("/campgrounds/:id/comments/:comment_id",middleware.checkingauthorizationcomments,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedcomment){
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});
// comment destroy route 
router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkingauthorizationcomments,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			res.redirect("back");
		}else{
			req.flash("success","comment deleted successfully")
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});
// middleWare
module.exports=router;