import { QRCodeSVG } from 'qrcode.react';

const DonationCard = ({ donation, role, onClaim, onComplete }) => {
  const badgeClass = donation.status === 'available' ? 'status-available' : 
                     donation.status === 'claimed' ? 'status-claimed' : 'status-completed';

  // Super clean function to download the QR code as an SVG image
  const downloadQR = () => {
    const svg = document.getElementById(`qr-${donation._id}`);
    if (!svg) return; // Safety check
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `FoodBridge-Pickup-${donation.foodName}.svg`;
    link.click();
    URL.revokeObjectURL(url); // cleans up memory
  };

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

      {/* --- THE NEW QR CONTAINER WITH DOWNLOAD BUTTON --- */}
      {role === 'Donor' && donation.status === 'claimed' && donation.qrCode && (
        <div className="qr-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <p className="qr-title">Scan for Pickup</p>
          <div className="qr-box">
            {/* Added the exact ID required for the download function */}
            <QRCodeSVG id={`qr-${donation._id}`} value={donation.qrCode} size={160} />
          </div>
          <button onClick={downloadQR} className="btn-outline-primary small-btn" style={{ width: '100%', marginTop: '5px' }}>
            📥 Download QR
          </button>
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