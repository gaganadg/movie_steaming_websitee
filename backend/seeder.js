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
    trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    language: "English",
    releaseDate: new Date("2010-07-16")
  },
  {
    title: "The Dark Knight",
    contentType: "Movie",
    genre: "Action",
    rating: 10,
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    thumbnail: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    language: "English",
    releaseDate: new Date("2008-07-18")
  },
  {
    title: "Stranger Things",
    contentType: "Series",
    genre: "Sci-Fi",
    rating: 9,
    description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
    thumbnail: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8m1m0qGgB.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=b9EkMc79ZSU",
    language: "English",
    releaseDate: new Date("2016-07-15")
  },
  {
    title: "Breaking Bad",
    contentType: "Series",
    genre: "Drama",
    rating: 10,
    description: "A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student in order to secure his family's future.",
    thumbnail: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=HhesaQXLuRY",
    language: "English",
    releaseDate: new Date("2008-01-20")
  },
  {
    title: "Formula 1: Drive to Survive",
    contentType: "Sports",
    genre: "Documentary",
    rating: 8.5,
    description: "Drivers, managers and team owners live life in the fast lane -- both on and off the track -- during each cutthroat season of Formula 1 racing.",
    thumbnail: "https://image.tmdb.org/t/p/w500/z0T0HwKzB5eZ5l5t5rA8A5Vl5V.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=wtJPe1lsjc8",
    language: "English",
    releaseDate: new Date("2019-03-08")
  },
  {
    title: "The Last Dance",
    contentType: "Sports",
    genre: "Documentary",
    rating: 9.5,
    description: "In the fall of 1997, Michael Jordan and the Chicago Bulls begin their quest to win a sixth NBA title in eight years. But despite all Jordan has achieved since his sensational debut 13 years earlier, \"The Last Dance,\" as coach Phil Jackson called it, will be shadowed by tension with the club's front office.",
    thumbnail: "https://image.tmdb.org/t/p/w500/o7y1B3r3Tqz6VwQ6r0B7fQh2Tq.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=Peh9Yqf1GXc",
    language: "English",
    releaseDate: new Date("2020-04-19")
  },
  {
    title: "Spider-Man: Into the Spider-Verse",
    contentType: "Movie",
    genre: "Action",
    rating: 9,
    description: "Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
    thumbnail: "https://image.tmdb.org/t/p/w500/tg52up16eq0.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=tg52up16eq0",
    language: "English",
    releaseDate: new Date("2018-12-14")
  },
  {
    title: "Dune",
    contentType: "Movie",
    genre: "Sci-Fi",
    rating: 8.5,
    description: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people.",
    thumbnail: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=8g18jFHCLXk",
    language: "English",
    releaseDate: new Date("2021-10-22")
  },
  {
    title: "Dangal",
    contentType: "Movie",
    genre: "Drama",
    rating: 9.0,
    description: "Biographical sports drama about Mahavir Singh Phogat, who taught wrestling to his daughters Geeta Phogat and Babita Kumari to make them world champions.",
    thumbnail: "https://image.tmdb.org/t/p/w500/c75Gq1752D8n25v70i295v31m3b.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=x_7YlGv9u1g",
    language: "Hindi",
    releaseDate: new Date("2016-12-23")
  },
  {
    title: "3 Idiots",
    contentType: "Movie",
    genre: "Comedy",
    rating: 9.5,
    description: "Two friends are searching for their long lost companion. They revisit their college days and recall the memories of their friend who inspired them to think differently.",
    thumbnail: "https://image.tmdb.org/t/p/w500/66a4goRGBnVa6TYwBD6WRjR6iLB.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=K0eDlFX9GMc",
    language: "Hindi",
    releaseDate: new Date("2009-12-25")
  },
  {
    title: "Sholay",
    contentType: "Movie",
    genre: "Action",
    rating: 9.2,
    description: "After his family is murdered by a notorious bandit, a retired police officer enlists the help of two outlaws to capture him.",
    thumbnail: "https://image.tmdb.org/t/p/w500/n3F2v9pG0E1q0Q7LhWvj4jY9i.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=de_4S4kK8sE",
    language: "Hindi",
    releaseDate: new Date("1975-08-15")
  },
  {
    title: "Baahubali: The Beginning",
    contentType: "Movie",
    genre: "Action",
    rating: 9.3,
    description: "In ancient India, an adventurous and daring man becomes involved in a decadelong feud between two warring brothers.",
    thumbnail: "https://image.tmdb.org/t/p/w500/96515Z7d5N6xRrx37K32BUpq5sL.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=Vd4iNPuRlx4",
    language: "Telugu",
    releaseDate: new Date("2015-07-10")
  },
  {
    title: "RRR",
    contentType: "Movie",
    genre: "Action",
    rating: 9.5,
    description: "A fictitious story about two legendary revolutionaries and their journey away from home before they started fighting for their country in the 1920s.",
    thumbnail: "https://image.tmdb.org/t/p/w500/u49fzm9nwEs9snk342v5Qfb229C.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=NgBoMJy386M",
    language: "Telugu",
    releaseDate: new Date("2022-03-24")
  },
  {
    title: "Pushpa: The Rise",
    contentType: "Movie",
    genre: "Action",
    rating: 8.8,
    description: "A red sanders smuggler rises in the ranks of a syndicate, making enemies along the way as the police try to shut down the illegal trade.",
    thumbnail: "https://image.tmdb.org/t/p/w500/pE8YAhkLcrwZy0vW71lFdIeI8dI.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=Q1DYv-c189M",
    language: "Telugu",
    releaseDate: new Date("2021-12-17")
  },
  {
    title: "Interstellar",
    contentType: "Movie",
    genre: "Sci-Fi",
    rating: 9.6,
    description: "When Earth becomes uninhabitable, a team of explorers travels through a wormhole in space in an attempt to ensure humanity's survival.",
    thumbnail: "https://image.tmdb.org/t/p/w500/gEU2QvEOm36g2j608IFSpt3fgJd.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZATo3Dc",
    language: "English",
    releaseDate: new Date("2014-11-07")
  },
  {
    title: "Avengers: Endgame",
    contentType: "Movie",
    genre: "Action",
    rating: 9.4,
    description: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions.",
    thumbnail: "https://image.tmdb.org/t/p/w500/or0650h6hugbZg55XGs6Hky25Uq.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
    language: "English",
    releaseDate: new Date("2019-04-26")
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
