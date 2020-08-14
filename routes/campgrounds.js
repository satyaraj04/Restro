var express = require("express");
var router  = express.Router();
var Campground = require("../models/campgrounds");
var middleware = require("../middleware");
router.get("/campgrounds",function(req,res){
// 	get all components from the DB
	Campground.find({},function(err,allcampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/campgrounds",{campgrounds:allcampgrounds,currentuser:req.user});
			
		}
	});
	// res.render("campgrounds",{campgrounds:campgrounds});
});
router.post("/campgrounds",middleware.isloggedin,function(req,res){
	var name = req.body.name;
	var price = req.body.price;
	var img = req.body.image;
	var place = req.body.place;
	var description  = req.body.description
	var author = {
		id:req.user._id,
		username:req.user.username
	}
	var newcampground = {name: name,img: img,description:description,author:author,price:price,place:place}
	// campgrounds.push(newcampground);
// 	creating a new campground and saving it to the database instead of saving it to an array
	Campground.create(newcampground,function(err,createdpost){
		if(err){
			console.log(err)
		}else{
			res.redirect("/campgrounds");
		}
	})
	
	
});
// new - displaying the form
router.get("/campgrounds/new",middleware.isloggedin,function(req,res){
	res.render("campgrounds/new");
});
// show route adding more info about the specific image
router.get("/campgrounds/:id",function(req,res){
// 	find the campground with provided id 
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundpost){
		if(err){
			console.log(err);
		}else{
			console.log(foundpost);
			res.render("campgrounds/show",{campground:foundpost});
		}
	});
});
// edit campground route
router.get("/campgrounds/:id/edit",middleware.checkingauthorization,function(req,res){
// 	if the user is logged in

	Campground.findById(req.params.id,function(err,foundcampground){
			res.render("campgrounds/edit",{campground:foundcampground});
				// 	does the user created that respective ca
// 	or redirect
});
});
// update campground route
router.put("/campgrounds/:id",middleware.checkingauthorization,function(req,res){
// 	find and update the campground
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedcampground){
		if(err){
			res.redirect("/campgrounds")
}else{
	res.redirect("/campgrounds/" + req.params.id);
}
	});
	// redirect back to campgrounds/:id
});
// destroy campground route
router.delete("/campgrounds/:id",middleware.checkingauthorization,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
				res.redirect("/campgrounds");
		}
	});
});

// function isloggedin(req,res,next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect("/login");
// }
module.exports=router;