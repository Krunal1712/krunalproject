// src/pages/AppointmentBooking.js

import React, { useState } from 'react';

// NOTE: In a real app, 'services' and 'timeSlots' would be fetched from the Django API.
const mockServices = [
    { id: 1, name: 'General Checkup', provider: 'Dr. Smith' },
    { id: 2, name: 'Dental Cleaning', provider: 'Dr. Mayur' },
];
const mockTimeSlots = ['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM'];

const AppointmentBooking = () => {
    const [selectedService, setSelectedService] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const handleBooking = () => {
        if (selectedService && selectedDate && selectedTime) {
            alert(`Booking ${selectedService.name} with ${selectedService.provider} on ${selectedDate} at ${selectedTime}! (This will call the Django backend)`);
            // Call API to create appointment
        } else {
            alert('Please select a service, date, and time.');
        }
    };

    return (
        <div>
            <h2>🗓️ Book a New Appointment</h2>
            <p className="lead">Select your service, preferred date, and available time slot.</p>
            <hr />

            <div className="row">
                {/* 1. Service Selection */}
                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm p-3">
                        <h5 className="card-title">1. Choose a Service</h5>
                        <div className="list-group">
                            {mockServices.map(service => (
                                <button 
                                    key={service.id} 
                                    className={`list-group-item list-group-item-action ${selectedService && selectedService.id === service.id ? 'active' : ''}`}
                                    onClick={() => setSelectedService(service)}
                                >
                                    {service.name} ({service.provider})
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. Date and Time Selection */}
                <div className="col-md-8">
                    <div className="card shadow-sm p-3 mb-4">
                        <h5 className="card-title">2. Select Date and Time</h5>
                        {selectedService ? (
                            <>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Select Date:</label>
                                    {/* Using a standard HTML input for simplicity. A complex calendar library (like react-datepicker) would be used here. */}
                                    <input 
                                        type="date" 
                                        className="form-control" 
                                        value={selectedDate} 
                                        onChange={(e) => setSelectedDate(e.target.value)} 
                                    />
                                </div>
                                
                                {selectedDate && (
                                    <>
                                        <label className="form-label fw-bold">Available Time Slots:</label>
                                        <div className="btn-group d-flex flex-wrap" role="group">
                                            {mockTimeSlots.map(slot => (
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
                                    </>
                                )}
                            </>
                        ) : (
                            <div className="alert alert-info">Please select a service first.</div>
                        )}
                    </div>
                </div>
            </div>

            {/* 3. Final Booking Button */}
            <div className="d-grid gap-2">
                <button 
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