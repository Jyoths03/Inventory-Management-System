import React from 'react';

const cardStyle = {
  backgroundColor: 'black', // Light gray background for cards
  border: '1px solid #ddd', // Light border
  borderRadius: '8px', // Rounded corners
  padding: '20px', // Padding inside the card
  margin: '10px', // Margin around the card
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Shadow effect
  transition: 'transform 0.2s, box-shadow 0.2s', // Transition for hover effect
};

const cardHoverStyle = {
  transform: 'scale(1.05)', // Scale up on hover
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Darker shadow on hover
};

function Dashboard() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'maroon', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: 'black', marginBottom: '30px' }}>Dashboard</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Card 1 */}
        <div
          style={cardStyle}
          onMouseEnter={(e) => (e.currentTarget.style = { ...cardStyle, ...cardHoverStyle })}
          onMouseLeave={(e) => (e.currentTarget.style = cardStyle)}
        >
          <h2 style={{ color: '#2c3e50' }}>Total Inventory</h2>
          <p style={{ fontSize: '24px', color: '#e74c3c' }}>150</p>
          <p style={{ color: '#7f8c8d' }}>Items available</p>
        </div>
        {/* Card 2 */}
        <div
          style={cardStyle}
          onMouseEnter={(e) => (e.currentTarget.style = { ...cardStyle, ...cardHoverStyle })}
          onMouseLeave={(e) => (e.currentTarget.style = cardStyle)}
        >
          <h2 style={{ color: '#2c3e50' }}>Total Orders</h2>
          <p style={{ fontSize: '24px', color: '#3498db' }}>75</p>
          <p style={{ color: '#7f8c8d' }}>Orders placed</p>
        </div>
        {/* Card 3 */}
        <div
          style={cardStyle}
          onMouseEnter={(e) => (e.currentTarget.style = { ...cardStyle, ...cardHoverStyle })}
          onMouseLeave={(e) => (e.currentTarget.style = cardStyle)}
        >
          <h2 style={{ color: '#2c3e50' }}>Pending Billing</h2>
          <p style={{ fontSize: '24px', color: '#f1c40f' }}>5</p>
          <p style={{ color: '#7f8c8d' }}>Pending invoices</p>
        </div>
        {/* Card 4 */}
        <div
          style={cardStyle}
          onMouseEnter={(e) => (e.currentTarget.style = { ...cardStyle, ...cardHoverStyle })}
          onMouseLeave={(e) => (e.currentTarget.style = cardStyle)}
        >
          <h2 style={{ color: '#2c3e50' }}>Reports Generated</h2>
          <p style={{ fontSize: '24px', color: '#9b59b6' }}>20</p>
          <p style={{ color: '#7f8c8d' }}>Reports available</p>
        </div>
      </div>
      <footer style={{ textAlign: 'center', marginTop: '40px', color: '#7f8c8d' }}>
        <p>&copy; 2024 Your Company Name. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Dashboard;

