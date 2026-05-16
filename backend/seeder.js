const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('./models/Movie');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/movie-streaming');

const movies = [
  {
    title: "Inception",
    contentType: "Movie",
    genre: "Sci-Fi",
    rating: 9,
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    thumbnail: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0"
  },
  {
    title: "The Dark Knight",
    contentType: "Movie",
    genre: "Action",
    rating: 10,
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    thumbnail: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY"
  },
  {
    title: "Stranger Things",
    contentType: "Series",
    genre: "Sci-Fi",
    rating: 9,
    description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
    thumbnail: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8m1m0qGgB.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=b9EkMc79ZSU"
  },
  {
    title: "Breaking Bad",
    contentType: "Series",
    genre: "Drama",
    rating: 10,
    description: "A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student in order to secure his family's future.",
    thumbnail: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=HhesaQXLuRY"
  },
  {
    title: "Formula 1: Drive to Survive",
    contentType: "Sports",
    genre: "Documentary",
    rating: 8.5,
    description: "Drivers, managers and team owners live life in the fast lane -- both on and off the track -- during each cutthroat season of Formula 1 racing.",
    thumbnail: "https://image.tmdb.org/t/p/w500/z0T0HwKzB5eZ5l5t5rA8A5Vl5V.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=wtJPe1lsjc8"
  },
  {
    title: "The Last Dance",
    contentType: "Sports",
    genre: "Documentary",
    rating: 9.5,
    description: "In the fall of 1997, Michael Jordan and the Chicago Bulls begin their quest to win a sixth NBA title in eight years. But despite all Jordan has achieved since his sensational debut 13 years earlier, \"The Last Dance,\" as coach Phil Jackson called it, will be shadowed by tension with the club's front office.",
    thumbnail: "https://image.tmdb.org/t/p/w500/o7y1B3r3Tqz6VwQ6r0B7fQh2Tq.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=Peh9Yqf1GXc"
  },
  {
    title: "Spider-Man: Into the Spider-Verse",
    contentType: "Movie",
    genre: "Action",
    rating: 9,
    description: "Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
    thumbnail: "https://image.tmdb.org/t/p/w500/tg52up16eq0.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=tg52up16eq0"
  },
  {
    title: "Dune",
    contentType: "Movie",
    genre: "Sci-Fi",
    rating: 8.5,
    description: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people.",
    thumbnail: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=8g18jFHCLXk"
  }
];

const importData = async () => {
  try {
    // Clear existing movies to avoid duplicates
    await Movie.deleteMany();
    
    // Insert mock movies
    await Movie.insertMany(movies);
    
    console.log('Movies Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else {
  console.log('Run with -i flag to import data: node seeder.js -i');
  process.exit();
}
