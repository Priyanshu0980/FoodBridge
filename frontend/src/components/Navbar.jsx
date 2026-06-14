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
    <nav className="navbar">
      <div className="nav-brand">
        <h2>🥗 Food Bridge</h2>
      </div>
      
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/analytics">Impact</Link>
        
        {!token ? (
          <>
            
            <Link to="/login" className="btn-outline-primary small-btn">Login</Link>
            <Link to="/register" className="btn-primary small-btn">Register</Link>
          </>
        ) : (
          <>
            {role === 'Donor' && <Link to="/donor">Dashboard</Link>}
            {role === 'NGO' && <Link to="/ngo">Dashboard</Link>}
            <button onClick={handleLogout} className="btn-outline-danger small-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;