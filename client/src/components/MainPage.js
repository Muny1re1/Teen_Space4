import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Mainpage.css";
import Clubcard from "./Clubcard"

const dummyClubs = [
  {
    id: 1,
    name: "Science Explorers",
    description: "A club for young scientists to explore and experiment.",
    created_at: "2023-05-15T10:00:00Z",
  },
  {
    id: 2,
    name: "Art & Creativity",
    description: "Express yourself through various art forms and techniques.",
    created_at: "2023-05-20T11:30:00Z",
  },
  {
    id: 3,
    name: "Debate Team",
    description: "Sharpen your critical thinking and public speaking skills.",
    created_at: "2023-05-25T09:45:00Z",
  }
];

function MainPage() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = () => {
    setClubs(dummyClubs);
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
            <div className="logo">
              <img src="./logo.png" alt="logo" />
            </div>
          </div>
          <div className="clubs-container">
            {clubs.map(club => (
              <Clubcard key={club.id} club={club} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
