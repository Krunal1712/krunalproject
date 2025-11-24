import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchData = async () => {
    try {
      const user_id = localStorage.getItem("user_id");

      const res = await fetch(`http://127.0.0.1:8000/api/appointments/user/${user_id}/`);
      const data = await res.json();

      // FIX: transform API fields to frontend UI fields
      setAppointments(
        data.map(a => ({
          id: a.id,
          serviceName: a.service_name,
          provider: a.provider,
          patientName: a.patient_name,
          patientPhone: a.patient_phone,
          dateDisplay: a.date,
          time: a.time,
          createdAt: a.created_at,
        }))
      );

    } catch (err) {
      console.error("Error loading appointments", err);
      setAppointments([]);
    }
  };

  fetchData();
}, []);



  const handleClearAll = () => {
    if (!window.confirm('Clear all saved appointments?')) return;
    localStorage.removeItem('appointments');
    setAppointments([]);
  };

  return (
    <div>
      <h2>📋 User Dashboard</h2>
      <p className="lead">Your appointments with patient details.</p>

      {appointments.length === 0 ? (
        <div className="alert alert-warning">No appointments booked yet.</div>
      ) : (
        <div>
          <h5>Appointments ({appointments.length})</h5>

          {appointments.map((appt) => (
            <div key={appt.id} className="card mb-2 shadow-sm">
              <div className="card-body">

                {/* Service */}
                <h6 className="card-title mb-1">
                  {appt.serviceName}{' '}
                  <small className="text-muted">with {appt.provider}</small>
                </h6>

                {/* Patient Info */}
                <p className="mb-1">
                  <strong>Patient:</strong> {appt.patientName} <br />
                  <strong>Phone:</strong> {appt.patientPhone}
                </p>

                {/* Appointment Info */}
                <p className="mb-1">
                  <strong>Date:</strong> {appt.dateDisplay} <br />
                  <strong>Time:</strong> {appt.time}
                </p>

                {/* Footer */}
                <p className="text-muted small mb-0">
                  Booked on: {new Date(appt.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 d-flex gap-2">
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => navigate('/')}
        >
          Book New Appointment
        </button>

        <button
          className="btn btn-outline-danger"
          type="button"
          onClick={handleClearAll}
          disabled={appointments.length === 0}
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
