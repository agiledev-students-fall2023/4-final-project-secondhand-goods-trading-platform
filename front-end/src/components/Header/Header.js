import React from 'react';
import './Header.css';
import { Link, useLocation } from "react-router-dom"


function Header() {
    const location = useLocation(); 
    const isSearchPage = location.pathname === "/SearchPage";

    return (
        <header className="header">
            <Link to="/home">
                <button className="icon-button"><img src={`${process.env.PUBLIC_URL}/home-icon.png`} alt="Home"/></button>
            </Link>

            {/*We want to render the search page conditionally. If we are on any other page, search bar takes us to search page. If we are already on search page, there is no need to go again*/ }
            {isSearchPage ? (
                <input type="text" placeholder="Search here..." className="search-bar" />
            ) : (
                <Link to="/search">
                    <input type="text" placeholder="Search here..." className="search-bar" />
                </Link>
            )}

            {isSearchPage ? (
                <button className="icon-button">
                    <img src={`${process.env.PUBLIC_URL}/search-icon.png`} alt="Go" />
                </button>
            ) : (
                <Link to="/search">
                    <button className="icon-button">
                        <img src={`${process.env.PUBLIC_URL}/search-icon.png`} alt="Go" />
                    </button>
                </Link>
            )}
        </header>
    );
}

export default Header;
