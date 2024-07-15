import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
// import { number } from 'yup';

function Addform() {
  const formik = useFormik({
    initialValues: {
      announcement: '',
      club_id: '',
      date: '',
    },
  });
  // console.log(formik.values)

  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = JSON.stringify(formik.values); 
      // const formData = new FormData();
      // formData.append('announcement', formik.values.announcement);
      // formData.append('event', formik.values.club_id);
      // formData.append('date', formik.values.date);
      // console.log(JSON.stringify(formData));
      console.log(formData);

      const response = await fetch('http://localhost:5000/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: formData,
      });

      if (response.ok) {
        window.alert("Added Successfully")
        // data added successfully, redirect to another page or show a success message
      } else {
        setError('Failed to add data');
      }
    } catch (error) {
      setError('Failed to add data');
    }
  };

  return (
    <div className="addform">
      <div className="btn btn-back">
        <Link to="/mainpage">
          <i className="fa-solid fa-arrow-left-long"></i>
        </Link>
      </div>
      <div className="form-container starter">
        <form onSubmit={handleSubmit}>
          <h1>New News </h1>
          <div className="form-group">
            <input
              id="announcement"
              name="announcement"
              type="text"
              placeholder="New Announcement"
              value={formik.values.announcement}
              onChange={formik.handleChange}
            />
            <i class="fa-solid fa-bullhorn"></i>
          </div>
          <div className="form-group">
            <input
              id="club_id"
              name="club_id"
              type="number"
              placeholder="club_id"
              value={formik.values.club_id}
              onChange={formik.handleChange}
            />
            <i class="fa-solid fa-calendar-days"></i>
          </div>
          <div className="form-group">
            <input
              id="date"
              name="date"
              type="date"
              placeholder="Date For the Event"
              value={formik.values.date}
              onChange={formik.handleChange}
            />
          </div>
          <div className="btnn">
            <button type="submit" className="add-btn">
              Add
            </button>
          </div>
          {error && <div style={{ color: 'ed' }}>{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Addform;