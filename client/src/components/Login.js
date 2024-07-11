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
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            <i class="fa-solid fa-envelope"></i>
          </div>
          <div className="form-group">
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
            <div className="check">
              <input type="checkbox" name="remember" id="remember" />
              <label for="remember">Remember me</label>
            </div>
            <div>
              Forgot Password?
            </div>
          </div>

          <div className="btnn">
          <Link to="/mainpage" className="login-btn">
            Login <i class="fa-solid fa-right-to-bracket"></i>
          </Link>
          </div>

          <div className="signup">
            <h5>
              Don't have an account?<Link to="/signup"><span>Sign Up</span></Link>
            </h5>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
