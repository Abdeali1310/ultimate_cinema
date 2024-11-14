const User = require("../models/User");

async function addMovie(req, res) {
    const { id, userId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (!user.movieWatchlist.includes(id)) {
            user.movieWatchlist.push(id);
        } else {
            return res.status(400).json({ msg: 'Movie is already in the watchlist' });
        }

        await user.save();

        return res.status(200).json({ msg: 'Movie added to watchlist' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
}


async function getWatchList(req, res) {
    const { id, userId } = req.params;
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (user.movieWatchlist.includes(id)) {
            return res.status(200).json({ msg: 'Movie is in the watchlist' });
        }
    } catch (error) {
        res.status(400).json({msg:"Error while fetching"})
    }
}


async function removeMovie(req, res) {
    const { id, userId } = req.params;
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (user.movieWatchlist.includes(id)) {
            user.movieWatchlist = user.movieWatchlist.filter(movieId => movieId !== id);
        } else {
            return res.status(400).json({ msg: 'Movie is not in the watchlist' });
        }

        await user.save();

        return res.status(200).json({ msg: 'Movie removed from watchlist' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
}


async function addMovieToWatched(req, res) {
    const { id, userId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (!user.movieWatched.includes(id)) {
            user.movieWatched.push(id);
        } else {
            return res.status(400).json({ msg: 'Movie is already in the Watched' });
        }

        await user.save();

        return res.status(200).json({ msg: 'Movie added to Watched list' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
}

module.exports = { addMovie, getWatchList,removeMovie,addMovieToWatched }