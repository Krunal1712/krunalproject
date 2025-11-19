// src/pages/LoginPage.js

import React, { useState } from 'react';
import axios from "axios";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); 
  const [password, setPassword] = useState("");

  const API_URL = "http://127.0.0.1:8000/api/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // ---------- LOGIN ----------
        const res = await axios.post(`${API_URL}login/`, {
          email,
          password,
        });

        alert("Login Successful!");
        console.log(res.data);

      } else {
        // ---------- REGISTER ----------
        const res = await axios.post(`${API_URL}register/`, {
          email,
          name,
          password,
        });

        alert("User Registered Successfully!");
        console.log(res.data);
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Something went wrong!");
    }
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

              {/* EMAIL */}
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input 
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* NAME (only in Register mode) */}
              {!isLogin && (
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}

              {/* PASSWORD */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input 
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* BUTTON */}
              <button type="submit" className="btn btn-primary w-100">
                {isLogin ? 'Login' : 'Create Account'}
              </button>
            </form>

            <hr />

            <p className="text-center">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span 
                className="text-primary"
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
