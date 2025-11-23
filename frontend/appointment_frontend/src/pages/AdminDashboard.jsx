// src/pages/AdminDashboard.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://127.0.0.1:8000/api";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    users: 0,
    services: 0,
    appointments: 0,
  });

  const [todayAppointments, setTodayAppointments] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  // -------------------------------
  // Load Admin Data
  // -------------------------------
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${API}/admin/dashboard/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStats(response.data.stats);
      setTodayAppointments(response.data.todayAppointments);
      setTimeSlots(response.data.timeSlots);
      setLoading(false);
    } catch (error) {
      console.error("Dashboard load failed", error);
      setLoading(false);
    }
  };

  // -------------------------------
  // Navigation
  // -------------------------------
  const goToUsers = () => navigate("/admin/manage-users");
  const goToServices = () => navigate("/admin/manage-services");
  const goToAppointments = () => navigate("/admin/appointments");
  const goToTimeSlots = () => navigate("/admin/time-slots");
  const goToUserView = () => navigate("/user/dashboard");

  if (loading) return <h3 className="text-center mt-4">Loading Dashboard...</h3>;

  return (
    <div className="container mt-4">

      {/* Title */}
      <h2 className="text-primary mb-2">⚙️ Administrator Dashboard</h2>
      <p className="lead">Manage users, services, appointments, and time slots.</p>

      {/* STATS */}
      <div className="alert alert-info">
        <strong>Total Users:</strong> {stats.users} &nbsp; | &nbsp;
        <strong>Total Services:</strong> {stats.services} &nbsp; | &nbsp;
        <strong>Total Appointments:</strong> {stats.appointments}
      </div>

      {/* TODAY’S APPOINTMENTS */}
      <div className="card mt-3">
        <div className="card-header bg-warning text-dark">
          📅 Today's Appointments
        </div>
        <div className="card-body">
          {todayAppointments.length === 0 ? (
            <p>No appointments today.</p>
          ) : (
            todayAppointments.map((a) => (
              <div key={a.id} className="border p-2 mb-2 rounded">
                <strong>{a.patientName}</strong> — {a.serviceName}  
                <br />
                Time: {a.timeSlot}
              </div>
            ))
          )}
        </div>
      </div>

      {/* TIME SLOT LIST */}
      <div className="card mt-3">
        <div className="card-header bg-secondary text-white">⏱ Time Slots</div>
        <div className="card-body">
          {timeSlots.length === 0 ? (
            <p>No time slots found.</p>
          ) : (
            timeSlots.map((slot, index) => (
              <span key={index} className="badge bg-dark p-2 me-2">
                {slot}
              </span>
            ))
          )}
        </div>
      </div>

      {/* ACTION BUTTONS */}
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

        <button className="btn btn-warning btn-lg" onClick={goToTimeSlots}>
          ⏱ Manage Time Slots
        </button>

        <button className="btn btn-dark btn-lg" onClick={goToUserView}>
          👤 Switch to User View
        </button>

      </div>
    </div>
  );
};

export default AdminDashboard;
