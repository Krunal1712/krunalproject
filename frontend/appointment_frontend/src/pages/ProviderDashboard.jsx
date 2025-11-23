// src/pages/ProviderDashboard.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const ProviderDashboard = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch time slots from backend API
  const fetchTimeSlots = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/timeslots/");
      setTimeSlots(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching time slots:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeSlots();
  }, []);

  const toggleBlockSlot = async (slotId, isBlocked) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/timeslots/${slotId}/`, {
        is_blocked: !isBlocked,
      });

      fetchTimeSlots(); // Refresh list
    } catch (error) {
      console.error("Error updating slot:", error);
    }
  };

  const today = new Date().toLocaleDateString();
  const bookedCount = timeSlots.filter((slot) => slot.is_booked).length;

  if (loading)
    return <div className="text-center mt-5">Loading time slots...</div>;

  return (
    <div className="container mt-4">
      <h2>
        Service Provider Panel <span role="img">👨‍⚕️</span>
      </h2>
      <p className="lead">
        View and manage your daily appointment schedule.
      </p>

      {/* Summary Box */}
      <div className="alert alert-info">
        <strong>Today's Date:</strong> {today} <br />
        <strong>Today's Appointments:</strong> {bookedCount} booked.
      </div>

      <hr />

      <h4>All Time Slots</h4>

      {timeSlots.length === 0 ? (
        <p>No time slots created.</p>
      ) : (
        <div className="list-group mt-3">
          {timeSlots.map((slot) => (
            <div
              key={slot.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{slot.time}</strong>
                <br />
                {slot.is_booked ? (
                  <span className="badge bg-success mt-1">Booked</span>
                ) : slot.is_blocked ? (
                  <span className="badge bg-danger mt-1">Blocked</span>
                ) : (
                  <span className="badge bg-secondary mt-1">Available</span>
                )}
              </div>

              {/* Block / Unblock */}
              {!slot.is_booked && (
                <button
                  className={`btn ${
                    slot.is_blocked ? "btn-success" : "btn-warning"
                  }`}
                  onClick={() => toggleBlockSlot(slot.id, slot.is_blocked)}
                >
                  {slot.is_blocked ? "Unblock" : "Block"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <button className="btn btn-primary mt-4">Manage Time Slots</button>
    </div>
  );
};

export default ProviderDashboard;
