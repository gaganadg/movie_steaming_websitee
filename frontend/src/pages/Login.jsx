import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4%',
      backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url("https://assets.nflxext.com/ffe/siteui/vlv3/ca6a7616-0acb-4bc5-be25-c4deef0419a7/c5af601a-6657-4531-8f82-22e629a3795e/IN-en-20231211-popsignuptwoweeks-perspective_alpha_website_large.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div style={{
        background: 'rgba(0, 0, 0, 0.75)',
        padding: '3rem 4rem',
        borderRadius: '4px',
        width: '100%',
        maxWidth: '450px',
        marginTop: '60px' // to account for fixed navbar
      }} className="fade-in">
        <h1 style={{ marginBottom: '2rem' }}>Sign In</h1>
        
        {error && (
          <div style={{ 
            background: '#e87c03', 
            color: 'white', 
            padding: '1rem', 
            borderRadius: '4px', 
            marginBottom: '1rem' 
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input 
            type="email" 
            placeholder="Email address" 
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            type="submit" 
            className="btn-primary" 
            style={{ marginTop: '1.5rem', padding: '1rem' }}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '2rem', color: '#737373' }}>
          New to Tubeflix? <Link to="/signup" style={{ color: 'white' }}>Sign up now.</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
