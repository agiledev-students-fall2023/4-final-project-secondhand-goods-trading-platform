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
        const token = localStorage.getItem('token'); // Assuming you store the JWT token in localStorage
    if (!token) {
      console.error('User not authenticated');
      setLoading(false);
      return;
    }

    // Existing line in OrderHistory.js
    const response = await axios.get(`/api/order-history`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

        if (response.status === 200) {
          console.log("Order History:", response.data);
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
