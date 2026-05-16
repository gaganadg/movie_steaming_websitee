import { useState } from 'react';
import { X, Star } from 'lucide-react';
import useMovieStore from '../store/movieStore';
import useAuthStore from '../store/authStore';

const TrailerModal = ({ isOpen, onClose, movie }) => {
  if (!isOpen || !movie) return null;
  const trailerUrl = movie.trailerUrl;
  
  const [hoveredStar, setHoveredStar] = useState(0);
  const { rateMovie } = useMovieStore();
  const { isAuthenticated } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRate = async (score) => {
    if (!isAuthenticated) return alert("Please log in to rate.");
    setIsSubmitting(true);
    try {
      await rateMovie(movie._id, score);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Extract video ID from youtube url to embed
  const getEmbedUrl = (url) => {
    try {
      if (url.includes('embed')) return url;
      const videoId = url.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } catch (e) {
      return url;
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <div style={{
        position: 'relative',
        width: '90%',
        maxWidth: '1000px',
        aspectRatio: '16/9',
        backgroundColor: '#000',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 0 20px rgba(0,0,0,0.5)'
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(0,0,0,0.6)',
            color: 'white',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
        >
          <X size={24} />
        </button>
        
        {trailerUrl ? (
          <iframe
            width="100%"
            height="100%"
            src={getEmbedUrl(trailerUrl)}
            title="Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'white'}}>
            Trailer not available
          </div>
        )}
      </div>

      <div style={{
        marginTop: '1rem',
        background: '#141414',
        padding: '1rem 2rem',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        color: 'white',
        boxShadow: '0 0 20px rgba(0,0,0,0.5)',
        zIndex: 10000
      }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Rate "{movie.title}"</h3>
        <div style={{ display: 'flex', gap: '0.5rem', opacity: isSubmitting ? 0.5 : 1 }}>
          {[1, 2, 3, 4, 5].map(star => (
            <Star
              key={star}
              size={28}
              onClick={() => handleRate(star)}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              style={{ cursor: 'pointer' }}
              fill={(hoveredStar || (movie.rating / 2)) >= star ? '#e50914' : 'transparent'}
              color={(hoveredStar || (movie.rating / 2)) >= star ? '#e50914' : '#888'}
            />
          ))}
        </div>
        {!isAuthenticated && <p style={{ fontSize: '0.8rem', color: '#888', margin: 0 }}>Log in to rate</p>}
      </div>
    </div>
  );
};

export default TrailerModal;
