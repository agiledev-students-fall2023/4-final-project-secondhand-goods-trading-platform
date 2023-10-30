import React from 'react';
import './Homepage.css';
import Header from '../Header/Header';
import Categories from '../Categories/Categories';
import ItemListings from '../ItemListings/ItemListings.js';


import { Link } from 'react-router-dom';


function Homepage() {


    return (
        <div className="homepage-container">

            <Header />
            <Categories />

            <section className="actions">
                <Link to = "/viewyourproduct" className="action-icon-button">
                    <img src={`${process.env.PUBLIC_URL}/seller-icon.png`} alt="Sell"/>
                    <span>View Your Products</span>
                    </Link>

                <Link to="/Account"> {/* Link to the account page */}
                    <button className="action-icon-button">
                        <img src={`${process.env.PUBLIC_URL}/account-icon.png`} alt="Account"/>
                        <span>Account Profile</span>
                    </button>
                </Link>
            </section>

            <section className="items">
                <ItemListings /> 
            </section>
        </div>
    );
}

export default Homepage;
