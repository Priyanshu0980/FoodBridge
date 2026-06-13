import { useState, useEffect } from 'react';
import API from '../services/api';
import DonationCard from '../components/DonationCard';

const DonorDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [formData, setFormData] = useState({
    foodName: '',
    quantity: '',
    address: '',
    pickupTime: ''
  });

  const fetchDonations = async () => {
    try {
      const { data } = await API.get('/donations/my');
      setDonations(data);
    } catch (error) {
      console.error('Failed to fetch donations');
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/donations', formData);
      setFormData({ foodName: '', quantity: '', address: '', pickupTime: '' });
      fetchDonations();
    } catch (error) {
      console.error('Failed to create donation');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Donor Dashboard</h2>
      
      <div style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <h3>Create a New Donation</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="text" name="foodName" placeholder="What food are you donating?" value={formData.foodName} onChange={handleChange} required style={{ padding: '10px' }} />
          <input type="text" name="quantity" placeholder="Quantity (e.g., 50 meals, 10 kg)" value={formData.quantity} onChange={handleChange} required style={{ padding: '10px' }} />
          <input type="text" name="address" placeholder="Pickup Location" value={formData.address} onChange={handleChange} required style={{ padding: '10px' }} />
          <input type="text" name="pickupTime" placeholder="Available Time (e.g., 6 PM - 8 PM)" value={formData.pickupTime} onChange={handleChange} required style={{ padding: '10px' }} />
          <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
            List Food for Pickup
          </button>
        </form>
      </div>

      <h3>My Active Donations</h3>
      {donations.length === 0 ? (
        <p>You haven't listed any donations yet.</p>
      ) : (
        <div>
          {donations.map((donation) => (
            <DonationCard key={donation._id} donation={donation} role="Donor" />
          ))}
        </div>
      )}
    </div>
  );
};

export default DonorDashboard;