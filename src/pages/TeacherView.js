import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.js";

export default function TeacherView() {
    const navigate = useNavigate();

  const [studentObjects, setStudentObjects] = useState([]);

  const onEdit = async (objId) => {
    try {
       navigate(`/principalView/editUser/${objId}`);
    } catch (error) {
      console.error("Errorediting data:", error);
    }
  };

  const onDelete = async (objId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/backend/users/deleteUsers/${objId}`
      );
      console.log(response);
      fetchList();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    console.log("useEffect")
    fetchList();
  }, []);
const teacherId= localStorage.getItem('ID')
  const fetchList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/backend/classroom/getTeachersView/${teacherId}`
      );
      console.log(response.data);
    
      setStudentObjects(response.data.studentObj || []);
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
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {studentObjects.map((student, index) => (
                student.length?
                (<tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{student[0].name}</td>
                  <td>{student[0].email}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => onEdit(student[0]._id)}
                      aria-label="Edit"
                    >
                      <FaEdit />
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onDelete(student[0]._id)}
                      aria-label="Delete"
                    >
                      <MdAutoDelete />
                    </button>
                  </td>
                </tr>):""
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
