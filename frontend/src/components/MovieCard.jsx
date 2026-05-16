import { useState } from 'react';
import { Play, Plus, Check } from 'lucide-react';
import useMovieStore from '../store/movieStore';
import TrailerModal from './TrailerModal';

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useMovieStore();

  const isSaved = isInWatchlist(movie._id);

  const handleWatchlist = (e) => {
    e.stopPropagation();
    if (isSaved) {
      removeFromWatchlist(movie._id);
    } else {
      addToWatchlist(movie._id);
    }
  };

  return (
    <>
      <div 
        style={{
          position: 'relative',
          minWidth: '250px',
          height: '140px',
          borderRadius: '4px',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, z-index 0.3s',
          transform: isHovered ? 'scale(1.1) translateY(-10px)' : 'scale(1)',
          zIndex: isHovered ? 10 : 1,
          boxShadow: isHovered ? '0 10px 20px rgba(0,0,0,0.8)' : 'none'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
        <img 
          src={movie.thumbnail} 
          alt={movie.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        
        {isHovered && (
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            animation: 'fadeIn 0.2s ease-in-out'
          }}>
            <h4 style={{ margin: 0, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{movie.title}</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
                style={{
                  background: 'white',
                  color: 'black',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0
                }}
              >
                <Play size={16} fill="currentColor" />
              </button>
              <button 
                onClick={handleWatchlist}
                style={{
                  background: 'transparent',
                  color: 'white',
                  border: '2px solid rgba(255,255,255,0.5)',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0
                }}
              >
                {isSaved ? <Check size={16} /> : <Plus size={16} />}
              </button>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8rem', color: '#ccc' }}>
              <span style={{ color: '#46d369', fontWeight: 'bold' }}>{movie.rating}/10</span>
              <span>{movie.genre}</span>
            </div>
          </div>
        )}
      </div>

      <TrailerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        movie={movie} 
      />
    </>
  );
};

export default MovieCard;
