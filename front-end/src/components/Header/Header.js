import React from 'react';
import './Header.css';

function Header() {
    return (
        <header className="header">
            <button className="icon-button"><img src={`${process.env.PUBLIC_URL}/home-icon.png`} alt="Home"/></button>
            <input type="text" placeholder="Search here..." className="search-bar"/>
            <button className="icon-button"><img src={`${process.env.PUBLIC_URL}/search-icon.png`} alt="Go"/></button>
        </header>
    );
}

export default Header;
