import React from 'react';
import './Categories.css';

function Categories() {
    const categories = [
        { name: 'furniture', icon: `${process.env.PUBLIC_URL}/furniture-icon.png` },
        { name: 'study', icon: `${process.env.PUBLIC_URL}/study-icon.png` },
        { name: 'electronics', icon: `${process.env.PUBLIC_URL}/electronics-icon.png` },
        { name: 'clothes', icon: `${process.env.PUBLIC_URL}/clothes-icon.png` },
    ];

    return (
        <section className="categories">
            {categories.map((category, index) => (
                <button key={index} className="category-icon-button">
                    <img src={category.icon} alt={category.name} />
                </button>
            ))}
        </section>
    );
}

export default Categories;
