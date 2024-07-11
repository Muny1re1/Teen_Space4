import React from "react";
import { Link } from "react-router-dom";
import "./Mainpage.css";

function MainPage() {
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
        </div>
      </div>
    </div>
  );
}

export default MainPage;
