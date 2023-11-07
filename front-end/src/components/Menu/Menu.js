import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="hamburger" onClick={toggleMenu}>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
      </button>

      <div className={`menu-overlay ${isOpen ? 'open' : ''}`}>
        <nav className="menu">
          <Link to="/home" onClick={toggleMenu}>Home</Link>
          <Link to="/categorypage/for/Furniture" onClick={toggleMenu}>Furnitures</Link>
          <Link to="/categorypage/for/Electronics" onClick={toggleMenu}>Electronics</Link>
          <Link to="/categorypage/for/Study%20Supplies" onClick={toggleMenu}>Study Supplies</Link>
          <Link to="/categorypage/for/Clothes" onClick={toggleMenu}>Clothes</Link>
          <Link to="/viewyourproduct" onClick={toggleMenu}>View Your Products</Link>
          <Link to="/addnewitem" onClick={toggleMenu}>Add New Item</Link>
          <Link to="/Account" onClick={toggleMenu}>Account</Link>

        </nav>
      </div>
    </>
  );
};

export default Menu;