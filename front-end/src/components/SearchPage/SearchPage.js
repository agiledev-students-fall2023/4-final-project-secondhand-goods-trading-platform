import React from 'react';
import './SearchPage.css';
import Header from '../Header/Header';
import Categories from '../Categories/Categories';

function SearchPage() {
    return (
        <div className="search-page-container">
            <Header />
            <Categories />
        </div>
    );
}

export default SearchPage;
