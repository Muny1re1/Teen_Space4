import React from 'react';
import './Card.css';

function Clubcard({ club }) {
  return (
    <div className="club-card">
      <Link to={`/club/${club.id}`}>
        <h3>{club.name}</h3>
      </Link>
      <p>Created: {new Date(club.created_at).toLocaleDateString()}</p>
      <p>{club.description}</p>
    </div>
  );
}

export default Clubcard;
