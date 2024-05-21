// NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import "../../Styles/NavBar.css"; // Import styles

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/userDashboard" className="navbar-link">
          <img
            src="https://static.vecteezy.com/system/resources/previews/011/162/083/original/fitness-sport-gym-logo-design-vector.jpg"
            alt="Logo"
            className="navbar-logo-img"
          />
        </Link>
      </div>
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/userDashboard" className="navbar-link">
            Dashboard
          </Link>
        </li>
        {/* <li className="navbar-item">
          <Link to="/profile" className="navbar-link">
            Profile
          </Link>
        </li> */}
        <li className="navbar-item">
          <Link to="/feed" className="navbar-link">
            Feed
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/workout" className="navbar-link">
            Workout
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/mealPlan" className="navbar-link">
            Meal Plan
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/imageUploader" className="navbar-link">
            Upload Post
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
