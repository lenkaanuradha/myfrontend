import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
export default function EditUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [credentials, setCredentials] = useState({});
  const navigate=useNavigate();
  const location = useLocation();
  const role=localStorage.getItem('role');
  const objId = location.pathname.split("/")[3];
  console.log(objId)
  const handleSubmit = async(e) => {
    e.preventDefault();
    // setCredentials((prevCredentials) => ({
    //     ...prevCredentials,
    //     name: name,
    //    email: email,
    //    password: password
    //   }));
    const credentials={name:name,email:email,password:password};
    try {
      console.log("cre",credentials);
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/backend/users/editUsers/${objId}`,credentials
        );
        console.log(response,"response");
        
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    console.log({ name, email, password });
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Save Changes</button>
        {role === 'principal'? <button  className="btn btn-success  mx-3" onClick={()=>navigate('/principalView')}>Go back</button>:
         <button  className="btn btn-success  mx-3" onClick={()=>navigate('/teacherview')}>Go back</button>}
       
      </form>
    </div>
  );
}
