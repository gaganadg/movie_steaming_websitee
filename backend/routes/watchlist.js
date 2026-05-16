const express = require('express');
const {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist
} = require('../controllers/watchlistController');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All watchlist routes require authentication

router
  .route('/')
  .get(getWatchlist);

router
  .route('/:movieId')
  .post(addToWatchlist)
  .delete(removeFromWatchlist);

module.exports = router;
