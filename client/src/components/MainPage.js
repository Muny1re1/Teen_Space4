import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Mainpage.css";
import Clubcard from "./components/Clubcard"

function MainPage() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    // Fetch Clubs
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    // Clubs API
    const response = await fetch("/api/clubs");
    const data = await response.json();
    setClubs(data);
  };

  return (
    <div>
      <div className="main-container">
        <div className="sidebar">
          <nav className="nav-container">
            <ul className="nav-links">
              <li>
                <Link to="/mainpage" className="login-btn" title="Home">
                  <i className="fa-solid fa-house"></i>
                </Link>
              </li>
              <li>
                <Link to="/login" className="login-btn" title="Login">
                  <i className="fa-solid fa-right-to-bracket"></i>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="main-content">
          <div className="nav-top">
          <Link to="/notification" className="login-btn"><i class="fa-solid fa-bell fa-shake"></i></Link>
          </div>
          <div className="clubs-section">
            <h2>TeenSpace Clubs</h2>
            <div className="club-container">
              {clubs.map((club) => (
                <Clubcard key={club._id} club={club} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
