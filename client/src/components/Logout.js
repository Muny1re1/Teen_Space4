import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Logout({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/logout", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Logout successful:", data);
      onLogout();
      navigate("/");
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
        <button onClick={handleLogout}>
          Logout
        </button>
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