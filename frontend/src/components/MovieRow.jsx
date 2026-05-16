import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

const MovieRow = ({ title, movies }) => {
  const rowRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const checkScroll = () => {
    if (rowRef.current) {
      setIsScrolled(rowRef.current.scrollLeft > 0);
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div style={{ marginBottom: '3rem', position: 'relative' }}>
      <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem', paddingLeft: '4%' }}>{title}</h2>
      
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {isScrolled && (
          <button 
            onClick={() => handleScroll('left')}
            style={{
              position: 'absolute',
              left: 0,
              zIndex: 40,
              background: 'rgba(0,0,0,0.5)',
              color: 'white',
              height: '100%',
              width: '4%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <ChevronLeft size={32} />
          </button>
        )}

        <div 
          ref={rowRef}
          onScroll={checkScroll}
          style={{
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            overflowY: 'hidden',
            padding: '1rem 4%',
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none' // IE/Edge
          }}
          className="movie-row-container"
        >
          {movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>

        <button 
          onClick={() => handleScroll('right')}
          style={{
            position: 'absolute',
            right: 0,
            zIndex: 40,
            background: 'rgba(0,0,0,0.5)',
            color: 'white',
            height: '100%',
            width: '4%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <ChevronRight size={32} />
        </button>
      </div>
      <style>{`
        .movie-row-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default MovieRow;
