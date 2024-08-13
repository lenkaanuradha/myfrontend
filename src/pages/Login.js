import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/backend/auth/login`, formData);
      const data = response.data;
      console.log(data)
      console.log(response.status);
      if (response.status === 200) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('ID', data.details._id);
        console.log('Login successful');
        if(data.role === 'student'){
          navigate('/studentview')
        }
        else if(data.role === 'teacher'){
          navigate('/teacherview');
        }
        else{
          navigate('/principalView');
        }
      } else {
        console.log(data.msg || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-header">
          <h2 className="text-center">Login</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
            <div className='text-center my-4'>
              Don't have an account? <Link to={'/register'}>Register</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
