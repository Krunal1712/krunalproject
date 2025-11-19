// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">🗓️ Appointment Booking</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/user/dashboard">User View</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/provider/dashboard">Provider</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/dashboard">Admin</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn btn-outline-light ms-2" to="/login">Login/Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;