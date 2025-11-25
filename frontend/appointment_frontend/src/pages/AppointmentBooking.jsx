import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const mockServices = [
  { id: 1, name: 'General Checkup', provider: 'Dr. Smith' },
  { id: 2, name: 'Dental Cleaning', provider: 'Dr. Mayur' },
  { id: 3, name: 'Eye Exam', provider: 'Dr. Patel' }
];

const mockTimeSlots = ['09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '04:00 PM'];

const AppointmentBooking = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');

  const navigate = useNavigate();

  const handleSelectService = (s) => {
    setSelectedService(s);
    setSelectedDate('');
    setSelectedTime('');
  };

  // -------------- PHONE VALIDATION (10 DIGIT) ------------------
  const isValidPhone = (num) => {
    return /^[0-9]{10}$/.test(num);
  };

  // ------------------------------- SAVE INTO BACKEND -------------------------------
  const handleBooking = async () => {
    if (
      !selectedService ||
      !selectedDate ||
      !selectedTime ||
      !patientName.trim() ||
      !patientPhone.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    if (!isValidPhone(patientPhone)) {
      alert("Mobile number must be exactly 10 digits.");
      return;
    }

    const user_id = localStorage.getItem("user_id");

    if (!user_id) {
      alert("User not logged in. Please login again.");
      return;
    }

    const payload = {
      user_id: user_id,
      patient_name: patientName,
      patient_phone: patientPhone,
      service_name: selectedService.name,
      provider: selectedService.provider,
      date: selectedDate,
      time: selectedTime
    };

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/appointments/create/",
        payload,
        { withCredentials: true }
      );

      if (res.status === 201) {
        alert("Appointment booked successfully!");
        navigate("/user/dashboard");
      }
    } catch (err) {
      console.error("Error creating appointment:", err.response?.data || err);
      alert("Failed to book appointment.");
    }
  };

  // ------------------------------- UI -------------------------------
  return (
    <div>
      <h2>🗓️ Book a New Appointment</h2>
      <p className="lead">Enter patient details → choose service → date → time.</p>
      <hr />

      {/* PATIENT DETAILS */}
      <div className="card p-3 mb-4">
        <h5>1. Patient Details</h5>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Patient Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter full name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Mobile Number</label>
            <input
              type="tel"
              className={`form-control ${patientPhone && !isValidPhone(patientPhone) ? 'is-invalid' : ''}`}
              placeholder="Enter 10-digit mobile number"
              value={patientPhone}
              onChange={(e) => setPatientPhone(e.target.value)}
            />
            {patientPhone && !isValidPhone(patientPhone) && (
              <div className="invalid-feedback">
                Mobile number must be exactly 10 digits.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="row">

        {/* SERVICE LIST */}
        <div className="col-md-4 mb-4">
          <div className="card p-3">
            <h5>2. Choose a Service</h5>
            <div className="list-group">
              {mockServices.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`list-group-item list-group-item-action 
                    ${selectedService?.id === s.id ? 'active' : ''}`}
                  onClick={() => handleSelectService(s)}
                >
                  <div><strong>{s.name}</strong></div>
                  <small className="text-muted">{s.provider}</small>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* DATE & TIME */}
        <div className="col-md-8">
          <div className="card p-3">
            <h5>3. Select Date & Time</h5>

            {!selectedService ? (
              <div className="alert alert-info">Please select a service.</div>
            ) : (
              <>
                <div className="mb-3">
                  <label className="form-label fw-bold">Selected Service</label>
                  <div className="mb-2">
                    <strong>{selectedService.name}</strong> — 
                    <span className="text-muted"> {selectedService.provider}</span>
                  </div>

                  <label className="form-label fw-bold">Select Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setSelectedTime('');
                    }}
                    min={new Date().toISOString().slice(0, 10)}
                  />
                </div>

                {selectedDate && (
                  <>
                    <label className="form-label fw-bold">Available Time Slots</label>

                    <div className="d-flex flex-wrap">
                      {mockTimeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          className={`btn ${
                            selectedTime === slot ? 'btn-success' : 'btn-outline-primary'
                          } m-1`}
                          onClick={() => setSelectedTime(slot)}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>

                    <div className="mt-3">
                      <strong>Selected:</strong>{' '}
                      {selectedDate
                        ? new Date(selectedDate + 'T00:00:00').toLocaleDateString()
                        : '—'}{' '}
                      {selectedTime ? `at ${selectedTime}` : ''}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* CONFIRM BUTTON */}
      <div className="d-grid gap-2 mt-3">
        <button
          type="button"
          className="btn btn-lg btn-warning"
          onClick={handleBooking}
          disabled={
            !selectedService ||
            !selectedDate ||
            !selectedTime ||
            !patientName ||
            !patientPhone ||
            !isValidPhone(patientPhone)
          }
        >
          Confirm Appointment
        </button>
      </div>
    </div>
  );
};

export default AppointmentBooking;
