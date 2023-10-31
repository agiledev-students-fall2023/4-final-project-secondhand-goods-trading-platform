import React from 'react';
import './Categories.css';

import { Link } from 'react-router-dom';

function Categories() {
    const categories = [
        { name: 'Furniture', icon: `${process.env.PUBLIC_URL}/furniture-icon.png` },
        { name: 'Study Supplies', icon: `${process.env.PUBLIC_URL}/study-icon.png` },
        { name: 'Electronics', icon: `${process.env.PUBLIC_URL}/electronics-icon.png` },
        { name: 'Clothes', icon: `${process.env.PUBLIC_URL}/clothes-icon.png` },
    ];

    return (
        <section className="categories">
            {categories.map((category, index) => (
                <Link key={index} to={`/categorypage/for/${category.name}`} className="category-icon-button">
                    <img src={category.icon} alt={category.name} />
                </Link>
            ))}
        </section>
    );
}

export default Categories;
