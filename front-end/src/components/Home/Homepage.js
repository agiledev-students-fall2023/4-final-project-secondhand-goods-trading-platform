import React from 'react';
import './Homepage.css';
import Header from '../Header/Header';
import Categories from '../Categories/Categories';
import ItemListings from '../ItemListings/ItemListings.js';


function Homepage() {

    const categories = [
        { name: 'furniture', icon: `${process.env.PUBLIC_URL}/furniture-icon.png` },
        { name: 'study', icon: `${process.env.PUBLIC_URL}/study-icon.png` },
        { name: 'electronics', icon: `${process.env.PUBLIC_URL}/electronics-icon.png` },
        { name: 'clothes', icon: `${process.env.PUBLIC_URL}/clothes-icon.png` },
    ];
    

    return (
        <div className="homepage-container">

            <Header />
            <Categories />

            <section className="actions">
                <button className="action-icon-button">
                    <img src={`${process.env.PUBLIC_URL}/seller-icon.png`} alt="Sell"/>
                    <span>View Your Products</span>
                </button>
                <button className="action-icon-button">
                    <img src={`${process.env.PUBLIC_URL}/account-icon.png`} alt="Account"/>
                    <span>Account Profile</span>
                </button>
            </section>

            <section className="items">
                <ItemListings /> 
            </section>
        </div>
    );
}

export default Homepage;
