const Review = require("../models/Review");
const User = require("../models/User");


async function addReview(req, res) {
    const { userId, movieIdOrReviewId } = req.params;
    const { comment, rating } = req.body;

    try {
        const review = await Review.create({ comment, rating, userId, movieIdOrReviewId });
        if (review) {
            res.status(201).json({ msg: "Review Created" });
        }
    } catch (error) {
        console.log("Error while creating review", error);
        res.status(500).json({ msg: "Invalid Inputs" })
    }

}


async function getReviews(req, res) {
    try {
        const reviews = await Review.find({ movieIdOrReviewId: req.params.movieIdOrReviewId })
        .populate('userId', 'username')  
        .exec();
        
        if (!reviews) {
            return res.status(404).json({ message: 'No reviews found for this movie' });
        }
        res.json(reviews);
    } catch (error) {
        console.log("Error fetching reviews:", error);
        res.status(500).json({ message: "Server error" });
    }
}
module.exports = { addReview,getReviews }