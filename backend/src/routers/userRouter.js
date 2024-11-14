const express = require("express");
const { userSignup, userSignin, userProfile, currentUser, editProfile } = require("../controllers/userController");
const { isLoggedIn } = require("../middlewares/auth");
const userRouter = express.Router();
const multer  = require('multer')
const { storage } = require("../../cloudConfig");
const upload = multer({storage })

userRouter.post("/signup",userSignup)
userRouter.post("/signin",userSignin)
userRouter.get("/profile",isLoggedIn,userProfile)
userRouter.get("/",isLoggedIn,currentUser)
userRouter.put("/profile/edit/:userId",upload.single('profilePic'),editProfile)
module.exports = userRouter;