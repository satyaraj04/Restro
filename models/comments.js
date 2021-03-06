var mongoose = require("mongoose");
var commentSchema = mongoose.Schema({
		text:String,
		created:{type:Date,default:Date.now},
		author:{
			id:{
				type:mongoose.Schema.Types.ObjectId,
				ref:"user"
				
			},
			username:String
		}
});
var comment = mongoose.model("Comment",commentSchema);
module.exports = comment;