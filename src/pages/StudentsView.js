import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.js";

export default function TeacherView() {
    const navigate = useNavigate();

  const [studentObjects, setStudentObjects] = useState([]);
  

  

  useEffect(() => {
    console.log("useEffect")
    fetchList();
  }, []);
const studentId=localStorage.getItem('ID');
  const fetchList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/backend/classroom/getStudentView/${studentId}`
      );
     
    
      setStudentObjects(response.data.otherstudentsObjs || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="">
    <Navbar/>
    <div className="container ">
       
     
       

      <section className="mt-5">
        <h2 className="mb-4">Students</h2>
        {studentObjects.length > 0 ? (
          <table className="table table-bordered table-hover">
            <thead className="bg-primary text-white">
              <tr>
                <th scope="col">S.No.</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
               
              </tr>
            </thead>
            <tbody>
              {studentObjects.map((student, index) => (
               
                (<tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                
                 
                </tr>)
              ))}
            </tbody>
          </table>
        ) : (
          <p>No students available.</p>
        )}
      </section>
    </div>
    </div>
  );
}
