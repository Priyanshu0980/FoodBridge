import { QRCodeSVG } from 'qrcode.react';

const DonationCard = ({ donation, role, onClaim, onComplete }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0', borderRadius: '8px' }}>
      <h3>{donation.foodName}</h3>
      <p><strong>Quantity:</strong> {donation.quantity}</p>
      <p><strong>Address:</strong> {donation.address}</p>
      <p><strong>Pickup Time:</strong> {donation.pickupTime}</p>
      <p><strong>Status:</strong> {donation.status.toUpperCase()}</p>

      {role === 'Donor' && donation.status === 'claimed' && donation.qrCode && (
        <div style={{ marginTop: '15px' }}>
          <p><strong>Show this QR to the NGO volunteer:</strong></p>
          <QRCodeSVG value={donation.qrCode} size={150} />
        </div>
      )}

      {role === 'NGO' && donation.status === 'available' && (
        <button onClick={() => onClaim(donation._id)} style={{ marginTop: '10px', padding: '8px 16px', cursor: 'pointer' }}>
          Claim Donation
        </button>
      )}

      {role === 'NGO' && donation.status === 'claimed' && (
        <button onClick={() => onComplete(donation._id)} style={{ marginTop: '10px', padding: '8px 16px', cursor: 'pointer', backgroundColor: '#ff4c4c', color: 'white', border: 'none' }}>
          Manual Override: Mark Completed
        </button>
      )}
    </div>
  );
};

export default DonationCard;