import React from 'react';
import { Link } from 'react-router-dom';
import './EditProfile.css';

function EditProfile () {
  return (
    <div className="edit-container">
        <Link to="/home">
        <button className="icon-button"><img src={`${process.env.PUBLIC_URL}/home-icon.png`} alt="Home"/></button>
      </Link>
      <div className="edit-section">
        <div className="edit-item">
          <label>Username:</label>
          <input type="text" />
        </div>
        <div className="edit-item">
          <label>Phone number:</label>
          <input type="tel" />
        </div>
        <div className="edit-item">
          <label>Address line 1:</label>
          <input type="text" />
        </div>
        <div className="edit-item">
          <label>Address line 2:</label>
          <input type="text" />
        </div>
        <div className="edit-item">
          <label>Payment method:</label>
          <input type="text" />
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
