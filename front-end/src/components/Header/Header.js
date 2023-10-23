import React from 'react';
import './Header.css';
import { Link, useLocation } from "react-router-dom"


function Header() {
    const location = useLocation(); 
    const isSearchPage = location.pathname === "/SearchPage";

    return (
        <header className="header">
            <button className="icon-button"><img src={`${process.env.PUBLIC_URL}/home-icon.png`} alt="Home"/></button>


            {/*We want to render the components conditionally. If we are on any other page, searchbar takes us to search page. If we are already on search page, there is no need to go again.*/ }
            {isSearchPage ? (
                <input type="text" placeholder="Search here..." className="search-bar" />
            ) : (
                <Link to="/SearchPage">
                    <input type="text" placeholder="Search here..." className="search-bar" />
                </Link>
            )}

            {isSearchPage ? (
                <button className="icon-button">
                    <img src={`${process.env.PUBLIC_URL}/search-icon.png`} alt="Go" />
                </button>
            ) : (
                <Link to="/SearchPage">
                    <button className="icon-button">
                        <img src={`${process.env.PUBLIC_URL}/search-icon.png`} alt="Go" />
                    </button>
                </Link>
            )}
        </header>
    );
}

export default Header;
