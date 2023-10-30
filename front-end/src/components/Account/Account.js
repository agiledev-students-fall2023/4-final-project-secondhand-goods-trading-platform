import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Account.css';

function Account() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch('https://picsum.photos/v2/list')
      .then((response) => response.json())
      .then((data) => {
        // Assuming data is an array of objects
        if (data && data.length > 0) {
          // Use the first object from the array (you can modify this as needed)
          setUserData(data[0]);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
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
            <td>{userData ? userData.author : 'Loading...'}</td>
            <td>
              <Link to="/EditProfile">
                <button className="edit-button">Edit</button>
              </Link>
            </td>
          </tr>
          <tr>
            <td>{userData ? userData.width : 'Loading...'}</td>
            <td>
              <Link to="/EditProfile">
                <button className="edit-button">Edit</button>
              </Link>
            </td>
          </tr>
          <tr>
            <td>Card Ending: {userData ? userData.height : 'Loading...'}</td>
            <td>
              <Link to="/EditProfile">
                <button className="edit-button">Edit</button>
              </Link>
            </td>
          </tr>
          <tr>
            <td> {userData ? userData.url : 'Loading...'}</td>
            <td>
              <Link to="/EditProfile">
                <button className="edit-button">Edit</button>
              </Link>
            </td>
          </tr>
          <tr>
            <td> {userData ? userData.download_url : 'Loading...'}</td>
            <td>
              <Link to="/EditProfile">
                <button className="edit-button">Edit</button>
              </Link>
            </td>
          </tr>
          <tr>
            <td>Order History</td>
            <td>
              <Link to="/OrderHistory">
                <button className="view-button">View</button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Account;
