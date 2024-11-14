const express = require("express");
const { isLoggedIn } = require("../middlewares/auth");
const { addMovie, getWatchList, removeMovie, addMovieToWatched } = require("../controllers/movieController");
const movieRouter = express.Router();


//add movie to watchlist
movieRouter.post("/add/:id/user/:userId",isLoggedIn,addMovie)
movieRouter.get("/add/:id/user/:userId",isLoggedIn,getWatchList)
movieRouter.delete("/remove/:id/user/:userId",isLoggedIn,removeMovie)

//add movie to Watched list
movieRouter.post("/add/watched/:id/user/:userId",isLoggedIn,addMovieToWatched)

module.exports = movieRouter;