import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './EditProfile.css';
import axios from 'axios';
import Menu from '../Menu/Menu';

function EditProfile() {
  const [userData, setUserData] = useState({
    username: '',
    email: '', // Add the email field to the initial state
    addressLine1: '',
    addressLine2: '',
    payment: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      setMessage('User not authenticated');
      return;
    }
  
    // Use the account info route to fetch user data, if it's suitable
    axios.get(`http://localhost:3001/api/account?username=${loggedInUser}`)
      .then((response) => {
        const userDataFromApi = response.data.user || {};
        
        // Ensure the email field is included in the state
        setUserData((prevUserData) => ({
          ...prevUserData,
          ...userDataFromApi,
        }));
      })
      .catch((error) => {
        console.error('Error fetching user profile', error);
      });
  }, []);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSaveClick = () => {
    axios
      .put(`http://localhost:3001/api/edit-profile?username=${userData.username}`, userData)
      .then((response) => {
        const updatedUser = response.data.user;
        setMessage('Account information updated!');
        
        // Update the state with the updated user data (optional)
        setUserData(updatedUser);
      })
      .catch((error) => {
        console.error('Error updating user profile', error);
      });
  };
  
  return (
    <div className="edit-container">
      <Menu />
      <div className="edit-section">
        <div className="edit-item">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="edit-item">
          <label>Contact:</label>
          <input
            type="text"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="edit-item">
          <label>Address line 1:</label>
          <input
            type="text"
            name="addressLine1"
            value={userData.addressLine1}
            onChange={handleInputChange}
          />
        </div>
        <div className="edit-item">
          <label>Address line 2:</label>
          <input
            type="text"
            name="addressLine2"
            value={userData.addressLine2}
            onChange={handleInputChange}
          />
        </div>
        <div className="edit-item">
          <label>Payment method:</label>
          <input
            type="text"
            name="payment"
            value={userData.payment}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleSaveClick} className="save-button">Save</button>
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default EditProfile;
