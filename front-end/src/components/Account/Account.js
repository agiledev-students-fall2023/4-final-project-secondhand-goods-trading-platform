import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Account.css';
import Menu from '../Menu/Menu';
import axios from 'axios';



function Account() {
  const [userData, setUserData] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      setMessage('User not authenticated');
      return;
    }
    axios
      .get(`http://localhost:3001/api/account?username=${loggedInUser}`)
      .then((response) => {
        setUserData(response.data.user);
      })
      .catch((error) => {
        console.error('Error fetching user account info', error);
      });
  }, []);


  function displayDataOrPlaceholder(data, field) {
    // Check if data is present and not too long to fit on the same line
    if (data && data.length < 30) {
      return data; // Data is short enough to be in the same line
    }
    // Data is either empty or too long, so we put it on the next line
    // Also apply a placeholder if there is no data
    return <div>{data || `No ${field} yet, add some sparkle! ✨`}</div>;
  }
  
  return (
    <div className="account-container">
      <Menu />
      <div className="user-data">
      <div><strong>Username:</strong> {displayDataOrPlaceholder(userData.username, 'username')}</div>
      <div><strong>Email/Tel:</strong> {displayDataOrPlaceholder(userData.phone, 'contact')}</div>
      <div><strong>Payment Method:</strong>
  {userData.payment ? <div>Card Ending {userData.payment}</div> : <div>No card info yet, add some sparkle! ✨</div>}
</div>

        <div><strong>Address:</strong> 
        <div>{displayDataOrPlaceholder(userData.addressLine1, 'address')}</div>
        <div>{userData.addressLine2 ? userData.addressLine2 : ""}</div> {/* Second line only if present */}
      </div>
    </div>


      <div className="edit-profile-container">
        <Link to="/EditProfile">
          <button className="edit-profile-button">Edit Profile</button>
        </Link>
      </div>
      <div className="view-order-history-container">
        <Link to="/OrderHistory">
          <button className="view-order-history-button">View Order History</button>
        </Link>
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Account;
