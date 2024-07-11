import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Clubprofile.css';

const dummyClubProfile = {
  id: 1,
  name: "Science Explorers",
  description: "A club for young scientists to explore and experiment.",
  events: [
    { id: 1, name: "Rocket Launch Day", date: "2023-06-20T14:00:00Z" },
    { id: 2, name: "Chemistry Lab Tour", date: "2023-07-05T13:30:00Z" }
  ],
  notifications: [
    { id: 1, content: "Don't forget to bring safety goggles for the Chemistry Lab Tour!" },
    { id: 2, content: "New experiment kits have arrived! Join us this Friday to try them out." }
  ]
};

function Clubprofile() {
  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulating API calls with dummy data
    setClub(dummyClubProfile);
    setEvents(dummyClubProfile.events);
    setNotifications(dummyClubProfile.notifications);
  }, [id]);

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

export default Clubprofile;
