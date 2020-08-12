var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments");
var data = [
	{
		name:"kiryu",
	    img:"https://i.pinimg.com/236x/92/48/b5/9248b56a1294a6d14b3aa51da859a664.jpg",
		description:"The Kazuma Tiger"
	},
	{
		name:"majima",
	    img:"https://i.pinimg.com/236x/07/15/1b/07151b9bb986d3d6807afce0cfd04346.jpg",
		description:"The Sotenberi Champ"
	},
	{
		name:"makoto",
	    img:"https://i.pinimg.com/236x/9a/5f/66/9a5f6685a583f7b1170a35c07b97780c.jpg",
		description:"The Innocent Girl"
	}
];
function seeddb(){
// 	remove all campgrounds..
Campground.remove({},function(err){
	if(err){
	console.log(err);	
	}
	console.log("removed campgrounds");
	// 	add a few campgrounds 
	data.forEach(function(campground){
	Campground.create(campground,function(err,campground){
		if(err){
			console.log(err);
		}else{
			console.log("added campground");
// 			create a comment
			Comment.create(
			{
				text:"nice picture!",
				author:"evado adu"	
			},function(err,comment){
				if(err){
					console.log(err);
				}else{
				  campground.comments.push(comment)
				  campground.save();
					console.log("comment created");
             }
			
			});
	}
	});
	});
 });	

}
module.exports = seeddb;
