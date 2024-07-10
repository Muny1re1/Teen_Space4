import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const grinningEmoji = "😁";

  return (
    <div className="login">
      <div className="btn btn-back">
        <Link to="/">
          <i class="fa-solid fa-arrow-left-long"></i>
        </Link>
      </div>
      <div className="form-container starter">
        <form onSubmit={formik.handleSubmit}>
          <h1>Welcome Back</h1>
          <h2 className="emoji">{grinningEmoji}</h2>
          <h3>Sign in with your TeenSpace account</h3>
          <p>Let's get you signed in and straight to your activites</p>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input
              id="username"
              name="username"
              type="username"
              placeholder="Username"
              required
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            <i class="fa-solid fa-user"></i>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              required
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <i class="fa-solid fa-lock"></i>
          </div>

          <div class="remfo">
            <input type="checkbox" name="remember" id="remember" />
            <label for="remember">Remember me</label>
            <a href="#">Forgot Password?</a>
          </div>

          <Link to="/mainpage" className="login-btn">
            Login <i class="fa-solid fa-right-to-bracket"></i>
          </Link>
          <div className="signup">
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
