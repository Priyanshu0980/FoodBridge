import { QRCodeSVG } from 'qrcode.react';

const DonationCard = ({ donation, role, onClaim, onComplete }) => {
  const badgeClass = donation.status === 'available' ? 'status-available' : 
                     donation.status === 'claimed' ? 'status-claimed' : 'status-completed';

  return (
    <div className="premium-card">
      <div className="card-header">
        <h3>{donation.foodName}</h3>
        <span className={`status-badge ${badgeClass}`}>{donation.status}</span>
      </div>
      
      <div className="card-details">
        <p>📦 <strong>Quantity:</strong> {donation.quantity}</p>
        <p>📍 <strong>Pickup:</strong> {donation.address}</p>
        <p>⏰ <strong>Time:</strong> {donation.pickupTime}</p>
      </div>

      {role === 'Donor' && donation.status === 'claimed' && donation.qrCode && (
        <div className="qr-container">
          <p className="qr-title">Scan for Pickup</p>
          <div className="qr-box">
            <QRCodeSVG value={donation.qrCode} size={160} />
          </div>
        </div>
      )}

      {role === 'NGO' && donation.status === 'available' && (
        <button onClick={() => onClaim(donation._id)} className="btn-primary full-width">
          Claim This Rescue
        </button>
      )}

      {role === 'NGO' && donation.status === 'claimed' && (
        <button onClick={() => onComplete(donation._id)} className="btn-danger full-width">
          Mark Completed (Override)
        </button>
      )}
    </div>
  );
};

export default DonationCard;