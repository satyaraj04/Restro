var mongoose = require("mongoose");
var campgroundsschema = new mongoose.Schema({
	name:String,
	price:String,
	img:String,
	place:String,
	description:String,
	author:{
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"user"
		},
		username:String
	},
	comments:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"Comment"
		}
	]
});
var Campground = mongoose.model("campground",campgroundsschema);
module.exports = Campground;