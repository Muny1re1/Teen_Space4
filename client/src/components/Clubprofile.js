import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Clubprofile.css';

function ClubProfile() {
  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchClubDetails();
    fetchClubEvents();
    fetchClubNotifications();
  }, [id]);

  const fetchClubDetails = async () => {
    const response = await fetch(`/api/clubs/${id}`);
    const data = await response.json();
    setClub(data);
  };

  const fetchClubEvents = async () => {
    const response = await fetch(`/api/clubs/${id}/events`);
    const data = await response.json();
    setEvents(data);
  };

  const fetchClubNotifications = async () => {
    const response = await fetch(`/api/clubs/${id}/notifications`);
    const data = await response.json();
    setNotifications(data);
  };

  if (!club) return <div>Loading...</div>;

  return (
    <div className="club-profile">
      <h1>{club.name}</h1>
      <p>{club.description}</p>
      
      <h2>Events</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>{event.name} - {new Date(event.date).toLocaleDateString()}</li>
        ))}
      </ul>

      <h2>Notifications</h2>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id}>{notification.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default ClubProfile;
