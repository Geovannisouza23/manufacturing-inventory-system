import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <h1>Inventory Management System</h1>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/raw-materials">Raw Materials</Link></li>
          <li><Link to="/production">Production</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
