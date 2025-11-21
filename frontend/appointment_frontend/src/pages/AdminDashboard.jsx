// src/pages/AdminDashboard.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Navigation handlers
  const goToUsers = () => navigate("/admin/manage-users");
  const goToServices = () => navigate("/admin/manage-services");
  const goToAppointments = () => navigate("/admin/appointments");
  const goToUserView = () => navigate("/user/dashboard");

  return (
    <div className="container mt-4">

      {/* Title */}
      <h2 className="text-primary mb-2">⚙️ Administrator Dashboard</h2>
      <p className="lead">Manage system users, appointments, and services.</p>

      {/* Stats Section */}
      <div className="alert alert-warning">
        <strong>Total Users:</strong> 150 &nbsp; | &nbsp;
        <strong>Total Services:</strong> 10
      </div>

      {/* Action Buttons */}
      <div className="d-flex flex-column gap-3 mt-4">

        <button className="btn btn-success btn-lg" onClick={goToUsers}>
          👥 Manage Users
        </button>

        <button className="btn btn-info btn-lg" onClick={goToServices}>
          🛠 Manage Services
        </button>

        <button className="btn btn-secondary btn-lg" onClick={goToAppointments}>
          📅 Manage Appointments
        </button>

        <button className="btn btn-dark btn-lg" onClick={goToUserView}>
          👤 Switch to User View
        </button>

      </div>
    </div>
  );
};

export default AdminDashboard;
