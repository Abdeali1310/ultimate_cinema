const express = require("express");
const { isLoggedIn } = require("../middlewares/auth");
const { addTv, getWatchList, removeTv, addTvToWatched } = require("../controllers/tvController");
const tvRouter = express.Router();


//add tv to watchlist
tvRouter.post("/add/:id/user/:userId",isLoggedIn,addTv)
tvRouter.get("/add/:id/user/:userId",isLoggedIn,getWatchList)
tvRouter.delete("/remove/:id/user/:userId",isLoggedIn,removeTv)

//add watched list
tvRouter.post("/add/watched/:id/user/:userId",isLoggedIn,addTvToWatched)

module.exports = tvRouter;