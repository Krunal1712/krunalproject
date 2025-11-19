import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock data (replace with API later)
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
  const navigate = useNavigate();

  const handleSelectService = (s) => {
    setSelectedService(s);
    setSelectedDate('');
    setSelectedTime('');
  };

  const handleBooking = () => {
    if (!selectedService || !selectedDate || !selectedTime) {
      alert('Please select service, date and time.');
      return;
    }

    // Make safe ISO date for storage (YYYY-MM-DD)
    const dateIso = selectedDate; // input type=date already gives yyyy-mm-dd
    const dateObj = new Date(dateIso + 'T00:00:00'); // avoid timezone offset issues
    const dateDisplay = dateObj.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

    const newAppt = {
      id: `appt_${Date.now()}`,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      provider: selectedService.provider,
      dateIso,
      dateDisplay,
      time: selectedTime,
      createdAt: new Date().toISOString()
    };

    try {
      const stored = JSON.parse(localStorage.getItem('appointments') || '[]');
      stored.push(newAppt);
      localStorage.setItem('appointments', JSON.stringify(stored));
    } catch (err) {
      console.error('localStorage error:', err);
      alert('Could not save appointment locally.');
      return;
    }

    // optional: clear local selections (not required)
    setSelectedService(null);
    setSelectedDate('');
    setSelectedTime('');

    // redirect to dashboard where appointment will be visible
    navigate('/dashboard');
  };

  return (
    <div>
      <h2>🗓️ Book a New Appointment</h2>
      <p className="lead">Choose service → date → time.</p>
      <hr />

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card p-3">
            <h5>1. Choose a Service</h5>
            <div className="list-group">
              {mockServices.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`list-group-item list-group-item-action ${selectedService?.id === s.id ? 'active' : ''}`}
                  onClick={() => handleSelectService(s)}
                >
                  <div><strong>{s.name}</strong></div>
                  <small className="text-muted">{s.provider}</small>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card p-3">
            <h5>2. Select Date & Time</h5>

            {!selectedService ? (
              <div className="alert alert-info">Please select a service first.</div>
            ) : (
              <>
                <div className="mb-3">
                  <label className="form-label fw-bold">Selected Service</label>
                  <div className="mb-2">
                    <strong>{selectedService.name}</strong> — <span className="text-muted">{selectedService.provider}</span>
                  </div>

                  <label className="form-label fw-bold">Select Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={selectedDate}
                    onChange={(e) => { setSelectedDate(e.target.value); setSelectedTime(''); }}
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
                          className={`btn ${selectedTime === slot ? 'btn-success' : 'btn-outline-primary'} m-1`}
                          onClick={() => setSelectedTime(slot)}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>

                    <div className="mt-3">
                      <strong>Selected:</strong>{' '}
                      {selectedDate ? new Date(selectedDate + 'T00:00:00').toLocaleDateString() : '—'}{' '}
                      {selectedTime ? `at ${selectedTime}` : ''}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="d-grid gap-2 mt-3">
        <button
          type="button"
          className="btn btn-lg btn-warning"
          onClick={handleBooking}
          disabled={!selectedService || !selectedDate || !selectedTime}
        >
          Confirm Appointment
        </button>
      </div>
    </div>
  );
};

export default AppointmentBooking;
