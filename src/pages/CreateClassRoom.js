import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function CreateClassRoom() {
  const [name, setName] = useState('');
  const navigate = useNavigate()
  const [schedule, setSchedule] = useState([{ day: '', startTime: '', endTime: '' }]);
  const [students, setStudents] = useState([]);
  const [teacher, setTeacher] = useState('');

  const handleScheduleChange = (index, e) => {
    const { name, value } = e.target;
    const newSchedule = [...schedule];
    newSchedule[index] = { ...newSchedule[index], [name]: value };
    setSchedule(newSchedule);
  };

  const handleAddSchedule = () => {
    setSchedule([...schedule, { day: '', startTime: '', endTime: '' }]);
  };

  const handleRemoveSchedule = (index) => {
    setSchedule(schedule.filter((_, i) => i !== index));
  };

  const handleStudentChange = (e) => {
    setStudents(e.target.value.split(',').map(student => student.trim()));
  };

  const handleSubmit = async (e) => {
   
    e.preventDefault();
    try {
        console.log(name,schedule,students,teacher)
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/backend/classroom/createClassroom`, {
        name,
        schedule,
        students,
        teacher
      });
     
      console.log("data",response.data);
    } catch (error) {
       
      console.error('Error creating classroom:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Classroom</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Classroom Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {schedule.map((s, index) => (
          <div key={index} className="form-group">
            <h5>Schedule {index + 1}</h5>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor={`day-${index}`}>Day</label>
                <input
                  type="text"
                  className="form-control"
                  id={`day-${index}`}
                  name="day"
                  value={s.day}
                  onChange={(e) => handleScheduleChange(index, e)}
                  required
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor={`startTime-${index}`}>Start Time (eg.1:00 PM)</label>
                <input
                  type="text"
                  className="form-control"
                  id={`startTime-${index}`}
                  name="startTime"
                  value={s.startTime}
                  onChange={(e) => handleScheduleChange(index, e)}
                  required
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor={`endTime-${index}`}>End Time(eg.1:00 PM)</label>
                <input
                  type="text"
                  className="form-control"
                  id={`endTime-${index}`}
                  name="endTime"
                  value={s.endTime}
                  onChange={(e) => handleScheduleChange(index, e)}
                  required
                />
              </div>
            </div>
            <button type="button" className="btn btn-danger my-2" onClick={() => handleRemoveSchedule(index)}>
              Remove Schedule
            </button>
            <hr />
          </div>
        ))}
        <button type="button" className="btn btn-primary my-2" onClick={handleAddSchedule}>
          Add Schedule
        </button>

        <div className="form-group mt-3">
          <label htmlFor="students">Students (comma separated)</label>
          <input
            type="text"
            className="form-control"
            id="students"
            value={students.join(', ')}
            onChange={handleStudentChange}
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="teacher">Teacher Name</label>
          <input
            type="text"
            className="form-control"
            id="teacher"
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">Submit</button>
        <button type="submit" className="btn btn-success mt-3 mx-3" onClick={()=>navigate('/principalView')}>Go back</button>
      </form>
    </div>
  );
}
