import { useEffect, useState } from 'react';
import { Play, Info } from 'lucide-react';
import useMovieStore from '../store/movieStore';
import useAuthStore from '../store/authStore';
import MovieRow from '../components/MovieRow';
import TrailerModal from '../components/TrailerModal';

const Home = ({ contentType = '' }) => {
  const { movies, fetchMovies, fetchWatchlist, loading } = useMovieStore();
  const { isAuthenticated } = useAuthStore();
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchMovies('', contentType);
    if (isAuthenticated) {
      fetchWatchlist();
    }
  }, [fetchMovies, fetchWatchlist, isAuthenticated, contentType]);

  useEffect(() => {
    if (movies.length > 0) {
      // Pick a random featured movie, preferably Action or Sci-Fi for hero
      const featured = movies[Math.floor(Math.random() * movies.length)];
      setFeaturedMovie(featured);
    }
  }, [movies]);

  if (loading || !featuredMovie) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

  // Group movies by genre
  const moviesByGenre = movies.reduce((acc, movie) => {
    if (!acc[movie.genre]) {
      acc[movie.genre] = [];
    }
    acc[movie.genre].push(movie);
    return acc;
  }, {});

  return (
    <div style={{ paddingBottom: '4rem' }} className="fade-in">
      {/* Hero Section */}
      <div style={{
        position: 'relative',
        height: '80vh',
        width: '100%',
        marginBottom: '2rem'
      }}>
        <img 
          src={featuredMovie.thumbnail} 
          alt={featuredMovie.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top'
          }}
        />
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to right, rgba(20,20,20,0.9) 0%, rgba(20,20,20,0.4) 50%, transparent 100%), linear-gradient(to top, var(--bg-color) 0%, transparent 20%)'
        }}></div>
        
        <div style={{
          position: 'absolute',
          bottom: '25%',
          left: '4%',
          width: '50%',
          maxWidth: '600px'
        }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', textShadow: '2px 2px 4px rgba(0,0,0,0.45)' }}>
            {featuredMovie.title}
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem', textShadow: '2px 2px 4px rgba(0,0,0,0.45)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {featuredMovie.description}
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              className="btn-primary" 
              onClick={() => setIsModalOpen(true)}
              style={{ color: 'black', backgroundColor: 'white' }}
            >
              <Play size={24} fill="black" /> Play Trailer
            </button>
            <button className="btn-secondary">
              <Info size={24} /> More Info
            </button>
          </div>
        </div>
      </div>

      {/* Movie Rows */}
      <div style={{ marginTop: '-10vh', position: 'relative', zIndex: 10 }}>
        {Object.entries(moviesByGenre).map(([genre, genreMovies]) => (
          <MovieRow key={genre} title={genre} movies={genreMovies} />
        ))}
      </div>

      <TrailerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        movie={featuredMovie} 
      />
    </div>
  );
};

export default Home;
