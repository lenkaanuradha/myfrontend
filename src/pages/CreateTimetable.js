import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
export default function CreateTimetable() {
  const [formData, setFormData] = useState({
    subject: '',
    startTime: '',
    endTime: '',
    day: '',
    classroom: '',
  });

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
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/backend/timetable/createTimetable`, formData);

      if (response.status === 200) {
        console.log('Timetable created successfully');
        setFormData({
          subject: '',
          startTime: '',
          endTime: '',
          day: '',
          classroom: '',
        });
      } else {
        console.log('Failed to create timetable');
      }
    } catch (error) {
      console.error('Error:', error);
      console.log('An error occurred while creating the timetable');
    }
  };
const navigate = useNavigate();
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Create Timetable</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Subject:</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="startTime" className="form-label">Start Time:</label>
                  <input
                    type="text"
                    id="startTime"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="endTime" className="form-label">End Time:</label>
                  <input
                    type="text"
                    id="endTime"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="day" className="form-label">Day:</label>
                  <input
                    type="text"
                    id="day"
                    name="day"
                    value={formData.day}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="classroom" className="form-label">Classroom :</label>
                  <input
                    type="text"
                    id="classroom"
                    name="classroom"
                    value={formData.classroom}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Create Timetable</button>
                <button type="" className="btn btn-danger w-100 my-2" onClick={()=>navigate('/teacherview')}>Go Back</button>
              </form>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
