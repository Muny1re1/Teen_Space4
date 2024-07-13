import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';  // Import Yup for validation
import './Login';

function SignUp() {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Success:', data);
          window.alert("Your Signup was successful, Welcome to TeenSpace");
          resetForm(); // Reset the form
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle error, e.g., display error message
        });
    },
  });

  return (
<div className="signup">
  <div className="btn btn-back">
    <Link to="/">
      <i className="fa-solid fa-arrow-left-long"></i>
    </Link>
  </div>
  <div className="form-container starter">
    <form onSubmit={formik.handleSubmit}>
      <h1>Join TeenSpace</h1>
      <h2 className="emoji">😊</h2>
      <h3>Create your TeenSpace account</h3>
      <p>Let's get you started on your journey</p>
      <div className="form-group">
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        <i className="fa-solid fa-user"></i>
      </div>
      <div className="form-group">
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <i className="fa-solid fa-envelope"></i>
      </div>
      <div className="form-group">
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <i className="fa-solid fa-lock"></i>
      </div>
      <div className="form-group">
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
        />
        <i className="fa-solid fa-lock"></i>
      </div>
      <div className="btnn">
        <button type="submit" className="login-btn">
          Sign Up 
        </button>
      </div>
      <div className="signupp">
        <h5>
          Already have an account? <Link to="/login"><span><i class="fa-solid fa-right-to-bracket"></i></span></Link>
        </h5>
      </div>
    </form>
  </div>
</div>


  );
}

export default SignUp;

