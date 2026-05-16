import { useState, useEffect } from 'react';
import API from '../api/axios';

const Admin = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    genre: 'Action',
    rating: 1,
    description: '',
    thumbnail: '',
    trailerUrl: ''
  });

  const fetchMovies = async () => {
    try {
      const res = await API.get('/movies');
      setMovies(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/movies', formData);
      setFormData({
        title: '',
        genre: 'Action',
        rating: 1,
        description: '',
        thumbnail: '',
        trailerUrl: ''
      });
      fetchMovies();
      alert('Movie added successfully!');
    } catch (error) {
      alert(error.response?.data?.error || 'Error adding movie');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await API.delete(`/movies/${id}`);
        fetchMovies();
      } catch (error) {
        alert('Error deleting movie');
      }
    }
  };

  return (
    <div style={{ padding: '6rem 4% 4rem' }} className="fade-in container">
      <h1>Admin Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', marginTop: '2rem' }}>
        {/* Add Movie Form */}
        <div style={{ background: 'var(--modal-bg)', padding: '2rem', borderRadius: '8px' }}>
          <h3>Add New Movie</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="input-field" required />
            <select name="genre" value={formData.genre} onChange={handleChange} className="input-field" required>
              {['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Thriller', 'Documentary', 'Fantasy'].map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            <input type="number" name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating (1-10)" min="1" max="10" className="input-field" required />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="input-field" rows="4" required />
            <input name="thumbnail" value={formData.thumbnail} onChange={handleChange} placeholder="Thumbnail URL" className="input-field" required />
            <input name="trailerUrl" value={formData.trailerUrl} onChange={handleChange} placeholder="Trailer URL (YouTube)" className="input-field" required />
            <button type="submit" className="btn-primary">Add Movie</button>
          </form>
        </div>

        {/* Movie List */}
        <div style={{ background: 'var(--modal-bg)', padding: '2rem', borderRadius: '8px', overflowY: 'auto', maxHeight: '80vh' }}>
          <h3>Manage Movies</h3>
          {loading ? <p>Loading...</p> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              {movies.map(movie => (
                <div key={movie._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#222', borderRadius: '4px' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <img src={movie.thumbnail} alt={movie.title} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontWeight: 'bold' }}>{movie.title}</div>
                      <div style={{ fontSize: '0.8rem', color: '#aaa' }}>{movie.genre} | {movie.rating}/10</div>
                    </div>
                  </div>
                  <button className="btn-primary" style={{ background: '#e50914', padding: '0.5rem' }} onClick={() => handleDelete(movie._id)}>Delete</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
