// src/pages/AdminDashboard.js

import React from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 Import the hook

const AdminDashboard = () => {
    // 1. Initialize the navigate function
    const navigate = useNavigate(); 

    // 2. Define handler functions for clarity
    const handleManageUsers = () => {
        // This function will redirect the user to a new URL
        navigate('/admin/manage-users'); 
        console.log("Navigating to Manage Users page...");
    };

    const handleManageServices = () => {
        // This function will redirect the user to a new URL
        navigate('/admin/manage-services');
        console.log("Navigating to Manage Services page...");
    };

    return (
        <div>
            <h2>Administrator Control ⚙️</h2>
            <p className="lead">System overview and management tools.</p>
            
            <div className="alert alert-danger">
                Total Users: 150 | Total Services: 10
            </div>
            
            <div className="d-flex gap-2">
                {/* 3. Attach the onClick handlers to the buttons */}
                <button 
                    className="btn btn-success"
                    onClick={handleManageUsers} // 👈 Added handler
                >
                    Manage Users
                </button>
                
                <button 
                    className="btn btn-info"
                    onClick={handleManageServices} // 👈 Added handler
                >
                    Manage Services
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;