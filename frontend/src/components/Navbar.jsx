import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <h2>NGO Food Rescue</h2>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <Link to="/">Home</Link>
        <Link to="/analytics">Analytics</Link>
        
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            {role === 'Donor' && <Link to="/donor">Dashboard</Link>}
            {role === 'NGO' && <Link to="/ngo">Dashboard</Link>}
            <button onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;