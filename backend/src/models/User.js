const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    bio: {
        type: String,
        default: "",
    },
    profilePicUrl:{
        type:String,
    },
    movieWatchlist: [
        {
            type: String,
        }
    ],
    movieWatched: [
        {
            type: String,
        }
    ],
    tvWatchlist: [
        {
            type: String,
        }
    ],
    tvWatched: [
        {
            type: String,
        }
    ],
})

//password hashing
userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            console.log('Hashed password before saving:', hashedPassword); // Log the hashed password
            this.password = hashedPassword;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});


const User = mongoose.model("User", userSchema);

module.exports = User;