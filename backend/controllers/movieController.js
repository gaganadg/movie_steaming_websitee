const Movie = require('../models/Movie');

// @desc    Get all movies
// @route   GET /api/movies
// @access  Public
exports.getMovies = async (req, res, next) => {
  try {
    let query;

    const reqQuery = { ...req.query };
    const removeFields = ['select', 'sort', 'page', 'limit', 'search', 'contentType'];
    removeFields.forEach(param => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    let parsedQuery = JSON.parse(queryStr);

    if (req.query.search) {
      parsedQuery.title = { $regex: req.query.search, $options: 'i' };
    }

    if (req.query.contentType) {
      parsedQuery.contentType = req.query.contentType;
    }

    query = Movie.find(parsedQuery);

    const movies = await query;

    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get single movie
// @route   GET /api/movies/:id
// @access  Public
exports.getMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ success: false, error: 'Movie not found' });
    }

    res.status(200).json({
      success: true,
      data: movie
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Create new movie
// @route   POST /api/movies
// @access  Private (Admin only)
exports.createMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create(req.body);

    res.status(201).json({
      success: true,
      data: movie
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update movie
// @route   PUT /api/movies/:id
// @access  Private (Admin only)
exports.updateMovie = async (req, res, next) => {
  try {
    let movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ success: false, error: 'Movie not found' });
    }

    movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: movie
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Delete movie
// @route   DELETE /api/movies/:id
// @access  Private (Admin only)
exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ success: false, error: 'Movie not found' });
    }

    await movie.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Rate a movie
// @route   POST /api/movies/:id/rate
// @access  Private
exports.rateMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ success: false, error: 'Movie not found' });
    }

    const { score } = req.body;
    
    if (!score || score < 1 || score > 5) {
      return res.status(400).json({ success: false, error: 'Please provide a valid score between 1 and 5' });
    }

    // Check if user already rated
    const existingRatingIndex = movie.ratings.findIndex(
      (r) => r.user.toString() === req.user.id.toString()
    );

    if (existingRatingIndex !== -1) {
      movie.ratings[existingRatingIndex].score = score;
    } else {
      movie.ratings.push({ user: req.user.id, score });
    }

    // Recalculate average rating
    // Scale 1-5 to 1-10 for backward compatibility with existing rating field
    const avgScore = movie.ratings.reduce((acc, item) => acc + item.score, 0) / movie.ratings.length;
    movie.rating = avgScore * 2; 

    await movie.save();

    res.status(200).json({
      success: true,
      data: movie
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
