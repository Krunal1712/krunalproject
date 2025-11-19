import React from 'react';
// Display system stats, and links to manage Users, Providers, and Services.
const AdminDashboard = () => (
    <div>
        <h2>Administrator Control ⚙️</h2>
        <p className="lead">System overview and management tools.</p>
        <div className="alert alert-danger">Total Users: 150 | Total Services: 10</div>
        <div className="d-flex gap-2">
            <button className="btn btn-success">Manage Users</button>
            <button className="btn btn-info">Manage Services</button>
        </div>
    </div>
);
export default AdminDashboard;