import React from 'react';
import './Homepage.css';

function Homepage() {
    const items = Array(8).fill({
        name: 'Item name', 
        image: `${process.env.PUBLIC_URL}/listing-placeholder.png` 
    });

    const categories = [
        { name: 'furniture', icon: `${process.env.PUBLIC_URL}/furniture-icon.png` },
        { name: 'study', icon: `${process.env.PUBLIC_URL}/study-icon.png` },
        { name: 'electronics', icon: `${process.env.PUBLIC_URL}/electronics-icon.png` },
        { name: 'clothes', icon: `${process.env.PUBLIC_URL}/clothes-icon.png` },
    ];
    

    return (
        <div className="homepage-container">
            <header className="header">
                <button className="icon-button"><img src={`${process.env.PUBLIC_URL}/home-icon.png`} alt="Home"/></button>
                <input type="text" placeholder="Search here..." className="search-bar"/>
                <button className="icon-button"><img src={`${process.env.PUBLIC_URL}/search-icon.png`} alt="Go"/></button>
            </header>

            <section className="categories">
                {categories.map((category, index) => (
                <button key={index} className="category-icon-button">
                    <img src={category.icon} alt={category.name} />
                </button>
                ))}
            </section>

            <section className="actions">
                <button className="icon-button"><img src={`${process.env.PUBLIC_URL}/sell-icon.png`} alt="Sell"/></button>
                <button className="icon-button"><img src={`${process.env.PUBLIC_URL}/account-icon.png`} alt="Account"/></button>
            </section>

            <section className="items">
                {items.map((item, index) => (
                    <div key={index} className="item">
                        <img src={item.image} alt="Item" className="item-image"/>
                        <p className="item-name">{item.name}</p>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default Homepage;
