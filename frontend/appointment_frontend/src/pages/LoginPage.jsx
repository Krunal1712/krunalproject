// src/pages/LoginPage.js

import React, { useState } from 'react';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to call Django backend for login/registration
    console.log(isLogin ? 'Logging in...' : 'Registering...');
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-4">
        <div className="card shadow-lg">
          <div className="card-header bg-dark text-white text-center">
            <h3>{isLogin ? 'Sign In' : 'Register'}</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" required />
              </div>
              {!isLogin && (
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" required />
                </div>
              )}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" required />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                {isLogin ? 'Login' : 'Create Account'}
              </button>
            </form>
            <hr />
            <p className="text-center">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span 
                className="text-primary cursor-pointer" 
                style={{cursor: 'pointer'}} 
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Register' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;