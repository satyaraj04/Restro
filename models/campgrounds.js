var mongoose = require("mongoose");
var Comment = require("./comments");
var Review = require("./review");
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
	],
	    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    rating: {
        type: Number,
        default: 0
    }
});
var Campground = mongoose.model("campground",campgroundsschema);
module.exports = Campground;