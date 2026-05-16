import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, LogOut, User, Menu, X } from 'lucide-react';
import useAuthStore from '../store/authStore';
import useMovieStore from '../store/movieStore';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated, user, logout } = useAuthStore();
  const { fetchMovies } = useMovieStore();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(searchTerm);
    if (window.location.pathname !== '/') {
      navigate('/');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar" style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      padding: '1.25rem 4%',
      transition: 'background-color 0.3s',
      backgroundColor: isScrolled ? 'var(--nav-bg)' : 'transparent',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Link to="/" style={{ color: 'var(--primary-color)', fontSize: '1.8rem', fontWeight: 'bold' }}>
          TUBEFLIX (Demo)
        </Link>
        <div className="nav-links" style={{ display: 'none', gap: '1.5rem', '@media (min-width: 768px)': { display: 'flex' } }}>
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/series">Series</Link>
          <Link to="/sports">Sports</Link>
          {isAuthenticated && <Link to="/watchlist">My List</Link>}
          {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: '0.3rem 0.6rem', borderRadius: '4px', border: '1px solid #333' }}>
          <Search size={18} style={{ color: '#aaa', marginRight: '0.5rem' }} />
          <input 
            type="text" 
            placeholder="Search movies..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', width: '150px' }}
          />
        </form>
        
        {isAuthenticated ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <User size={20} />
              <span>{user?.name}</span>
            </div>
            <LogOut size={20} style={{ cursor: 'pointer' }} onClick={handleLogout} />
          </div>
        ) : (
          <Link to="/login" className="btn-primary" style={{ padding: '0.4rem 1rem' }}>Sign In</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
