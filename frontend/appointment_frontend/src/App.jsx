// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import Page Components
import LoginPage from './pages/LoginPage';
import UserDashboard from './pages/UserDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AppointmentBooking from './pages/AppointmentBooking';
import ManageServices from './pages/ManageServices';

// Import Protected Route
import ProtectedAdminRoute from './components/ProtectedAdminRoute';

function App() {
  return (
    <Router basename="/krunalproject">
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1 container mt-4 mb-4">
          <Routes>

            {/* Public Routes */}
            <Route path="/" element={<AppointmentBooking />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Role-Based Routes */}
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/provider/dashboard" element={<ProviderDashboard />} />
            <Route path="/admin/manage-services" element={<ManageServices />} />

            {/* PROTECTED ADMIN ROUTE */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            />

            {/* Additional Routes */}
            <Route path="/book/:serviceId" element={<AppointmentBooking />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;