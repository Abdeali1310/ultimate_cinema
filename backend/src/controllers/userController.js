const User = require('../models/User');
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

async function userSignup(req, res) {
    const { username, password, email } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const user = await User.create({
            username,
            password,
            email,
            profilePicUrl:"https://static.vecteezy.com/system/resources/previews/002/534/006/original/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg"
        })
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            return res.status(201).json({ token: token })
        }
    } catch (error) {
        console.log(error);
        res.status(411).json({ msg: "Email is already registered" })
    }
}

async function userSignin(req, res) {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: 'user does not exists' });
        }

        if (existingUser) {
            const isPasswordValid = await bcrypt.compare(password.trim(), existingUser.password.trim());
            // console.log("Entered password:", password.trim());
            // console.log("Stored password hash:", existingUser.password.trim());



            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid Password' });
            }

            const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            return res.status(200).json({ token });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Invalid credentials" })

    }
}

//current user
async function currentUser(req, res) {
    if (req.userId) {
        const id = req.userId;
        const user = await User.findById(id);
        return res.send({ user: user })
    } else {
        return res.status(411).json({ msg: "Sign in required" })
    }
}

//auth check
async function userProfile(req, res) {
    res.status(200).send({ message: "Hello", userId: req.userId });
}

async function editProfile(req, res) {
    const { userId } = req.params;
    const { username, email,bio } = req.body;
    const profilePicUrl = req.file ? req.file.path : null;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            { username, email,bio,profilePicUrl }, 
            { new: true } 
        );
        
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({msg:"Data Successfully Updated"});
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error });
    }
}


module.exports = { userSignup, userSignin, userProfile, currentUser,editProfile }