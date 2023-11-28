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
          throw new Error('User not authenticated');
        }

        let username;
        try {
          username = JSON.parse(loggedInUserData).username;
        } catch {
          username = loggedInUserData;
        }

        if (!username) {
          throw new Error('User not authenticated');
        }

        const response = await axios.get(`http://localhost:3001/api/order-history?username=${username}`);
        
        if (response.status === 200) {
          setOrders(response.data);
        } else {
          throw new Error(`Error fetching order history: ${response.statusText}`);
        }
      } catch (error) {
        console.error(error.message);
        setLoading(false);
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
