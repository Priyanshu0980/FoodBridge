import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import DonorDashboard from './pages/DonorDashboard';
import NgoDashboard from './pages/NgoDashboard';
import Analytics from './pages/Analytics';

const App = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Donor Route - Flexible case handling */}
        <Route 
          path="/donor" 
          element={token && (role === 'Donor' || role === 'donor') ? <DonorDashboard /> : <Navigate to="/login" />} 
        />
        
        {/* Protected NGO Route - Flexible case handling */}
        <Route 
          path="/ngo" 
          element={token && (role === 'NGO' || role === 'ngo') ? <NgoDashboard /> : <Navigate to="/login" />} 
        />
        
        <Route path="/analytics" element={<Analytics />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;