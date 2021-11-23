// middle middleware
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
var Review = require("../models/review");
var middlewareObj = {};
middlewareObj.checkingauthorization = function checkingauthorization(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundcampground) {
            if (err) {
                req.flash("error", "campground not found")
                res.redirect("back")
            } else {
                // 	does the user created that respective campground?
                if (foundcampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You Do Not Have Permission To Do That");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "you need to logged in");
        res.redirect("back");
    }
}
middlewareObj.checkingauthorizationcomments = function checkingauthorizationcomments(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundcomment) {
            if (err) {
                res.redirect("back")
            } else {
                // 	does the user created that respective comment?
                if (foundcomment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "you dont have permission to do that")
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "you need to login to do that")
        res.redirect("back");
    }
}
middlewareObj.isloggedin = function isloggedin(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Login First!")
    res.redirect("/login");
}
middlewareObj.checkReviewOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Review.findById(req.params.review_id, function(err, foundReview) {
            if (err || !foundReview) {
                res.redirect("back");
            } else {
                // does user own the comment?
                if (foundReview.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.checkReviewExistence = function(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id).populate("reviews").exec(function(err, foundCampground) {
            if (err || !foundCampground) {
                req.flash("error", "Campground not found.");
                res.redirect("back");
            } else {
                // check if req.user._id exists in foundCampground.reviews
                var foundUserReview = foundCampground.reviews.some(function(review) {
                    return review.author.id.equals(req.user._id);
                });
                if (foundUserReview) {
                    req.flash("error", "You already wrote a review.");
                    return res.redirect("/campgrounds/" + foundCampground._id);
                }
                // if the review was not found, go to the next middleware
                next();
            }
        });
    } else {
        req.flash("error", "You need to login first.");
        res.redirect("back");
    }
};
module.exports = middlewareObj