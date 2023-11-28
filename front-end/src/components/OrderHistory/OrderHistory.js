import React, { useState, useEffect } from 'react';
import './OrderHistory.css';
import Header from '../Header/Header';
import ItemListings from '../ItemListings/ItemListings';
import axios from 'axios';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrderHistory() {
      try {
        const loggedInUserData = localStorage.getItem('loggedInUser');
        if (!loggedInUserData) {
          console.error('User not authenticated');
          setLoading(false);
          return;
        }

        // Directly use username from local storage in Axios request
        const username = typeof loggedInUserData === 'string' ? loggedInUserData : JSON.parse(loggedInUserData).username; // Adjust based on your storage format

        const response = await axios.get(`http://localhost:3001/api/order-history?username=${username}`);
        if (response.status === 200) {
          setOrders(response.data);
        } else {
          console.error('Error fetching order history:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching order history:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrderHistory();
  }, []);

  return (
    <div className="order-history-container">
      <Header />
      <section className="items">
        {loading ? (
          <p>Loading...</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ItemListings items={orders} />
        )}
      </section>
    </div>
  );
}

export default OrderHistory;
