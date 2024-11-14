const express = require("express");
const reviewRouter = express.Router();

const { isLoggedIn } = require("../middlewares/auth");
const { addReview, getReviews } = require("../controllers/reviewController");



reviewRouter.get("/:movieIdOrReviewId", getReviews)
reviewRouter.post("/add/:userId/:movieIdOrReviewId", isLoggedIn, addReview)

module.exports = reviewRouter