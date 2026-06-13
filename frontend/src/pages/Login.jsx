import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await API.post('/auth/login', formData);
      
      // Store auth data in browser local storage
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('userId', data.userId);

      // Redirect based on role
      if (data.role === 'Donor') {
        navigate('/donor');
      } else if (data.role === 'NGO') {
        navigate('/ngo');
      }
      
      // Force page refresh to update Navbar state instantly
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '40px auto', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Login to Food Rescue</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required style={{ padding: '10px' }} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={{ padding: '10px' }} />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}>Login</button>
      </form>
      <p style={{ marginTop: '15px' }}>
        New user? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;