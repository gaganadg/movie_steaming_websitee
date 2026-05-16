const User = require('../models/User');

// @desc    Get user's watchlist
// @route   GET /api/watchlist
// @access  Private
exports.getWatchlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('watchlist');
    
    res.status(200).json({
      success: true,
      data: user.watchlist
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Add movie to watchlist
// @route   POST /api/watchlist/:movieId
// @access  Private
exports.addToWatchlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const movieId = req.params.movieId;

    if (!user.watchlist.includes(movieId)) {
      user.watchlist.push(movieId);
      await user.save();
    }

    res.status(200).json({
      success: true,
      data: user.watchlist
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Remove movie from watchlist
// @route   DELETE /api/watchlist/:movieId
// @access  Private
exports.removeFromWatchlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const movieId = req.params.movieId;

    user.watchlist = user.watchlist.filter(id => id.toString() !== movieId);
    await user.save();

    res.status(200).json({
      success: true,
      data: user.watchlist
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
