import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      <div className="card">
        <h2>Welcome to Inventory Management System</h2>
        <p style={{ marginBottom: '2rem', color: '#7f8c8d' }}>
          Manage your products, raw materials, and production planning efficiently.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <h3 style={{ marginBottom: '1rem', color: '#3498db' }}>Products</h3>
            <p style={{ marginBottom: '1rem', color: '#7f8c8d' }}>
              Manage product catalog with pricing and material requirements.
            </p>
            <Link to="/products" className="btn btn-primary">
              Manage Products
            </Link>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <h3 style={{ marginBottom: '1rem', color: '#27ae60' }}>Raw Materials</h3>
            <p style={{ marginBottom: '1rem', color: '#7f8c8d' }}>
              Control raw material inventory and stock levels.
            </p>
            <Link to="/raw-materials" className="btn btn-success">
              Manage Materials
            </Link>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <h3 style={{ marginBottom: '1rem', color: '#e74c3c' }}>Production</h3>
            <p style={{ marginBottom: '1rem', color: '#7f8c8d' }}>
              Calculate production capacity based on available stock.
            </p>
            <Link to="/production" className="btn btn-danger">
              View Production
            </Link>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '1rem' }}>System Features</h3>
        <ul style={{ lineHeight: '2', color: '#34495e' }}>
          <li>✓ Complete CRUD operations for products and raw materials</li>
          <li>✓ Associate raw materials with products</li>
          <li>✓ Calculate producible quantities based on stock</li>
          <li>✓ Prioritize production by product value</li>
          <li>✓ Real-time production value calculation</li>
          <li>✓ Responsive design for all devices</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
