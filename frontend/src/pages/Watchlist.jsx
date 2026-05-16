import { useEffect } from 'react';
import useMovieStore from '../store/movieStore';
import MovieCard from '../components/MovieCard';

const Watchlist = () => {
  const { watchlist, fetchWatchlist } = useMovieStore();

  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]);

  return (
    <div style={{ padding: '6rem 4% 4rem' }} className="fade-in">
      <h1 style={{ marginBottom: '2rem' }}>My List</h1>
      
      {watchlist.length === 0 ? (
        <div style={{ color: '#808080', fontSize: '1.2rem' }}>
          You haven't added any movies to your list yet.
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          {watchlist.map(movie => (
            <MovieCard key={movie._id || movie} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
