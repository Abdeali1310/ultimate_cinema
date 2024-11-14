const User = require("../models/User");

async function addTv(req, res) {
    const { id, userId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (!user.tvWatchlist.includes(id)) {
            user.tvWatchlist.push(id);
        } else {
            return res.status(400).json({ msg: 'tv is already in the watchlist' });
        }

        await user.save();

        return res.status(200).json({ msg: 'tv added to watchlist' });
    } catch (error) {
        console.error(" Error while adding tv ",error);
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

        if (user.tvWatchlist.includes(id)) {
            return res.status(200).json({ msg: 'tv is in the watchlist' });
        }
    } catch (error) {
        res.status(400).json({msg:"Error while fetching"})
    }
}

async function removeTv(req, res) {
    const { id, userId } = req.params;
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (user.tvWatchlist.includes(id)) {
            user.tvWatchlist = user.tvWatchlist.filter(tvId => tvId !== id);
        } else {
            return res.status(400).json({ msg: 'Tv is not in the watchlist' });
        }

        await user.save();

        return res.status(200).json({ msg: 'Tv removed from watchlist' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
}

async function addTvToWatched(req, res) {
    const { id, userId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (!user.tvWatched.includes(id)) {
            user.tvWatched.push(id);
        } else {
            return res.status(400).json({ msg: 'Tv is already in the Watched' });
        }

        await user.save();

        return res.status(200).json({ msg: 'Tv added to Watched list' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
}

module.exports = { addTv, getWatchList, removeTv,addTvToWatched }