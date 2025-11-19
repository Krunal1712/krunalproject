import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('appointments') || '[]');
      // sort by dateIso then time (time compare as string is fine for "HH:MM AM/PM" in same formats)
      stored.sort((a, b) => {
        if (a.dateIso < b.dateIso) return -1;
        if (a.dateIso > b.dateIso) return 1;
        // fallback: compare createdAt
        return a.createdAt < b.createdAt ? -1 : 1;
      });
      setAppointments(stored);
    } catch (err) {
      console.error('read error', err);
      setAppointments([]);
    }
  }, []);

  const handleClearAll = () => {
    if (!window.confirm('Clear all saved appointments?')) return;
    localStorage.removeItem('appointments');
    setAppointments([]);
  };

  return (
    <div>
      <h2>Welcome, User! 👤</h2>
      <p className="lead">Your upcoming appointments and history.</p>

      {appointments.length === 0 ? (
        <div className="alert alert-warning">No appointments booked yet.</div>
      ) : (
        <div>
          <h5>Appointments ({appointments.length})</h5>
          {appointments.map((appt) => (
            <div key={appt.id} className="card mb-2">
              <div className="card-body">
                <h6 className="card-title mb-1">
                  {appt.serviceName} <small className="text-muted">with {appt.provider}</small>
                </h6>
                <p className="card-text mb-1">
                  <strong>Date:</strong> {appt.dateDisplay} <br />
                  <strong>Time:</strong> {appt.time}
                </p>
                <p className="text-muted small mb-0">Booked on: {new Date(appt.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 d-flex gap-2">
        <button className="btn btn-primary" type="button" onClick={() => navigate('/book')}>Book New Appointment</button>
        <button className="btn btn-outline-danger" type="button" onClick={handleClearAll} disabled={appointments.length === 0}>Clear All</button>
      </div>
    </div>
  );
};

export default UserDashboard;
