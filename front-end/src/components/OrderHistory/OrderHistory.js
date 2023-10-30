import React from 'react';
import './OrderHistory.css';
import Header from '../Header/Header';
import ItemListings from '../ItemListings/ItemListings';

function OrderHistory() {
  return (
    <div className="order-history-container">
      <Header />
      <section className="items">
        {/* Display order history items */}
        <ItemListings />
      </section>
    </div>
  );
}

export default OrderHistory;
