import React from 'react';
import { Link } from 'react-router-dom';
import './Account.css';

function Account() {
  return (
    <div className="account-container">
      <Link to="/home">
        <button className="icon-button"><img src={`${process.env.PUBLIC_URL}/home-icon.png`} alt="Home"/></button>
      </Link>
      <table>
        
        <tbody>
          <tr>
            <td>Alexandria</td>
            <td>
                <Link to="/EditProfile"> {/* Link to the EditProfile page */}
                    <button className="edit-button">Edit</button>
                </Link>
            </td>
          </tr>
          <tr>
            <td>(+1)123-456-7890</td>
            <td>
                <Link to="/EditProfile"> {/* Link to the EditProfile page */}
                    <button className="edit-button">Edit</button>
                </Link>
            </td>
          </tr>
          <tr>
            <td>872C Apple Hall</td>
            <td>
                <Link to="/EditProfile"> {/* Link to the EditProfile page */}
                    <button className="edit-button">Edit</button>
                </Link>
            </td>
          </tr>
          <tr>
            <td>New York NY12345</td>
            <td>
                <Link to="/EditProfile"> {/* Link to the EditProfile page */}
                    <button className="edit-button">Edit</button>
                </Link>
            </td>
          </tr>
          <tr>
            <td>Card ending -1234</td>
            <td>
                <Link to="/EditProfile"> {/* Link to the EditProfile page */}
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
