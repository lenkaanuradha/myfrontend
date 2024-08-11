import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.js";

export default function PrincipalView() {
    const navigate = useNavigate();
  const [teacherObjects, setTeacherObjects] = useState([]);
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
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/backend/classroom/getPrincipalView`
      );
      console.log(response.data);
      setTeacherObjects(response.data.teacherObjects || []);
      setStudentObjects(response.data.studentObjects || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="">
    <Navbar/>
    <div className="container my-4">
       
      <section>
        <h2 className="mb-4">Teachers</h2>
        {teacherObjects.length > 0 ? (
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
              {teacherObjects.map((teacher, index) => (
                <tr key={teacher._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{teacher.name}</td>
                  <td>{teacher.email}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => onEdit(teacher._id)}
                      aria-label="Edit"
                    >
                      <FaEdit />
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onDelete(teacher._id)}
                      aria-label="Delete"
                    >
                      <MdAutoDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No teachers available.</p>
        )}
      </section>

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
                <tr key={student._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => onEdit(student._id)}
                      aria-label="Edit"
                    >
                      <FaEdit />
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onDelete(student._id)}
                      aria-label="Delete"
                    >
                      <MdAutoDelete />
                    </button>
                  </td>
                </tr>
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
