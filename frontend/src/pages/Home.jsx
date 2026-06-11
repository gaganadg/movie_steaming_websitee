import { useEffect, useState } from 'react';
import { Play, Info, Grid, List } from 'lucide-react';
import useMovieStore from '../store/movieStore';
import useAuthStore from '../store/authStore';
import MovieRow from '../components/MovieRow';
import MovieCard from '../components/MovieCard';
import TrailerModal from '../components/TrailerModal';

const Home = ({ contentType = '' }) => {
  const { movies, fetchMovies, fetchWatchlist, loading } = useMovieStore();
  const { isAuthenticated } = useAuthStore();
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filtering & Sorting states
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [sortOption, setSortOption] = useState('releaseDateDesc');
  const [viewMode, setViewMode] = useState('rows');

  useEffect(() => {
    fetchMovies('', contentType);
    if (isAuthenticated) {
      fetchWatchlist();
    }
  }, [fetchMovies, fetchWatchlist, isAuthenticated, contentType]);

  useEffect(() => {
    if (movies.length > 0) {
      // Pick a random featured movie
      const featured = movies[Math.floor(Math.random() * movies.length)];
      setFeaturedMovie(featured);
    }
  }, [movies]);

  if (loading || !featuredMovie) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

  // Client-side filtering & sorting
  const filteredAndSortedMovies = [...movies]
    .filter(movie => selectedLanguage === 'All' || movie.language === selectedLanguage)
    .sort((a, b) => {
      if (sortOption === 'releaseDateDesc') {
        return new Date(b.releaseDate || b.createdAt) - new Date(a.releaseDate || a.createdAt);
      }
      if (sortOption === 'releaseDateAsc') {
        return new Date(a.releaseDate || a.createdAt) - new Date(b.releaseDate || b.createdAt);
      }
      if (sortOption === 'ratingDesc') {
        return b.rating - a.rating;
      }
      if (sortOption === 'titleAsc') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  // Group filtered & sorted movies by genre
  const moviesByGenre = filteredAndSortedMovies.reduce((acc, movie) => {
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
        marginBottom: '1rem'
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

      {/* Filter and Sort Bar */}
      <div style={{
        padding: '1rem 4%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        background: 'rgba(20, 20, 20, 0.85)',
        borderBottom: '1px solid #222',
        position: 'sticky',
        top: '68px',
        zIndex: 900,
        backdropFilter: 'blur(10px)',
        marginBottom: '2rem'
      }}>
        {/* Languages */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--secondary-color)', fontWeight: '500' }}>Language:</span>
          {['All', 'English', 'Hindi', 'Telugu'].map(lang => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              style={{
                background: selectedLanguage === lang ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: 'none',
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: '600',
                transition: 'all 0.2s ease',
              }}
              className="pill-button"
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Sort and View Options */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--secondary-color)' }}>Sort By:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              style={{
                background: '#222',
                color: 'white',
                border: '1px solid #333',
                padding: '0.4rem 0.8rem',
                borderRadius: '4px',
                fontSize: '0.85rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="releaseDateDesc">Release Date: Newest First</option>
              <option value="releaseDateAsc">Release Date: Oldest First</option>
              <option value="ratingDesc">Rating: High to Low</option>
              <option value="titleAsc">Title: A-Z</option>
            </select>
          </div>

          <div style={{ display: 'flex', background: '#222', borderRadius: '4px', padding: '2px', border: '1px solid #333' }}>
            <button
              onClick={() => setViewMode('rows')}
              style={{
                background: viewMode === 'rows' ? '#333' : 'transparent',
                color: viewMode === 'rows' ? 'white' : '#888',
                border: 'none',
                padding: '0.3rem 0.5rem',
                borderRadius: '3px',
                display: 'flex',
                alignItems: 'center'
              }}
              title="Row View"
            >
              <List size={18} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                background: viewMode === 'grid' ? '#333' : 'transparent',
                color: viewMode === 'grid' ? 'white' : '#888',
                border: 'none',
                padding: '0.3rem 0.5rem',
                borderRadius: '3px',
                display: 'flex',
                alignItems: 'center'
              }}
              title="Grid View"
            >
              <Grid size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Movies Content */}
      {viewMode === 'rows' ? (
        <div style={{ position: 'relative', zIndex: 10 }}>
          {Object.keys(moviesByGenre).length === 0 ? (
            <div style={{ color: '#808080', fontSize: '1.2rem', textAlign: 'center', padding: '4rem 0' }}>
              No movies match your selected filters.
            </div>
          ) : (
            Object.entries(moviesByGenre).map(([genre, genreMovies]) => (
              <MovieRow key={genre} title={genre} movies={genreMovies} />
            ))
          )}
        </div>
      ) : (
        <div style={{ padding: '0 4%', position: 'relative', zIndex: 10 }}>
          {filteredAndSortedMovies.length === 0 ? (
            <div style={{ color: '#808080', fontSize: '1.2rem', textAlign: 'center', padding: '4rem 0' }}>
              No movies match your selected filters.
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1.5rem',
              animation: 'fadeIn 0.5s ease-in-out'
            }}>
              {filteredAndSortedMovies.map(movie => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      )}

      <TrailerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        movie={featuredMovie} 
      />
    </div>
  );
};

export default Home;
