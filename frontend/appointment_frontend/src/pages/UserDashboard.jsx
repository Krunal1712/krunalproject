import React from 'react';
// Display upcoming appointments, history, and a link to book new ones.
const UserDashboard = () => (
    <div>
        <h2>Welcome, User! 👤</h2>
        <p className="lead">Your upcoming appointments and booking history.</p>
        <div className="alert alert-success">You have 1 appointment scheduled for next Tuesday.</div>
        <button className="btn btn-primary">Book New Appointment</button>
    </div>
);
export default UserDashboard;