import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Logout({ onLogout }) {
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Logout successful:", data);
      onLogout();
      window.location.href = "/"; // Redirect to home page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <div className="btn btn-back">
        <Link to="/mainpage">
          <i className="fa-solid fa-arrow-left-long"></i>
        </Link>
      </div>
      <div className="btnn">
        <h1>Are you sure you want to logout?</h1>
        <Link to="/" className="">
          Logout
        </Link>
        <div className="signupp">
          <h5>
            <Link to="/mainpage"><span><i className="fa-solid fa-user"></i> Cancel</span></Link>
          </h5>
        </div>
      </div>
    </div>
  );
}

export default Logout;