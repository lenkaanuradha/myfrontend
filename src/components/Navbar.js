import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const role=localStorage.getItem('role');
  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-black px-3">
      <a className="navbar-brand" href="#home">ClassRoom</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      {role === 'principal'?
      ( <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link
              to="/principalview/createClassRoom"
              className="nav-link"
            >
              CreateClassRoom
            </Link>
          </li>
        </ul>
      </div>):""}
     
    </nav>
  );
}
