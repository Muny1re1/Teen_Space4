import React from 'react';
import { Link } from 'react-router-dom';
import "./Landingpage.css";

function Landingpage() {
  return (
    <div>
        <div className='landing-page-container'>
            <div className='login-btn'>
                <Link to='/login'><i className="fa-solid fa-right-to-bracket"></i>Login</Link>
            </div>
            <div className='intro-text'>
                <h1>Welcome to<br/><span>TeenSpace</span></h1>
            </div>
        </div>
    </div>
  );
}

export default Landingpage;
