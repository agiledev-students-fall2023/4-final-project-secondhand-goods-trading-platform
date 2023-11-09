import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Account.css';
import axios from 'axios';

function Account() {
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch user account info when the component mounts
    axios
      .get('http://localhost:3001/api/account')
      .then((response) => {
        setUserData(response.data.user);
      })
      .catch((error) => {
        console.error('Error fetching user account info', error);
      });
  }, []);

  return (
    <div className="account-container">
      <Link to="/home">
        <button className="icon-button">
          <img src={`${process.env.PUBLIC_URL}/home-icon.png`} alt="Home" />
        </button>
      </Link>
      <table>
        <tbody>
          <tr>
            <td>{userData.username}</td>
            <td>
              <Link to="/EditProfile">
                <button className="edit-button">
                  <img
                    src={`${process.env.PUBLIC_URL}/edit-icon.png`}
                    alt="Edit"
                    style={{ width: '40px', height: '40px' }}
                  />
                </button>
              </Link>
            </td>
          </tr>
          <tr>
            <td>{userData.phone}</td>
            <td>
              <Link to="/EditProfile">
                <button className="edit-button">
                  <img
                    src={`${process.env.PUBLIC_URL}/edit-icon.png`}
                    alt="Edit"
                    style={{ width: '40px', height: '40px' }}
                  />
                </button>
              </Link>
            </td>
          </tr>
          <tr>
            <td>Card Ending: {userData.payment}</td>
            <td>
              <Link to="/EditProfile">
                <button className="edit-button">
                  <img
                    src={`${process.env.PUBLIC_URL}/edit-icon.png`}
                    alt="Edit"
                    style={{ width: '40px', height: '40px' }}
                  />
                </button>
              </Link>
            </td>
          </tr>
          <tr>
            <td>{userData.addressLine1}</td>
            <td>
              <Link to="/EditProfile">
                <button className="edit-button">
                  <img
                    src={`${process.env.PUBLIC_URL}/edit-icon.png`}
                    alt="Edit"
                    style={{ width: '40px', height: '40px' }}
                  />
                </button>
              </Link>
            </td>
          </tr>
          <tr>
            <td>{userData.addressLine2}</td>
            <td>
              <Link to="/EditProfile">
                <button className="edit-button">
                  <img
                    src={`${process.env.PUBLIC_URL}/edit-icon.png`}
                    alt="Edit"
                    style={{ width: '40px', height: '40px' }}
                  />
                </button>
              </Link>
            </td>
          </tr>
          <tr>
            <td>Order History</td>
            <td>
              <Link to="/OrderHistory">
                <button className="view-button">
                  <img
                    src={`${process.env.PUBLIC_URL}/view-icon.png`}
                    alt="View"
                    style={{ width: '40px', height: '40px' }}
                  />
                </button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Account;
