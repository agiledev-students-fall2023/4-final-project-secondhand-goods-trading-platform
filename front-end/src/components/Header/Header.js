import React, { useState } from 'react'; 
import './Header.css';
import { Link , useNavigate} from "react-router-dom"

import Menu from '../Menu/Menu'; 


function Header() {

    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const handleSearchSubmit = () => {
        console.log("Searched:", searchValue); // testing
        navigate(`/searchresults/for/prompt=${searchValue}`);
    };



    return (
        <header className="header">
            {/* Replace the home icon with the Menu component */}
            <Menu />


            <div className="search-container">
            <input 
                type="text" 
                placeholder="Search here..." 
                className="search-bar" 
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)} 
            />
            

            <button className="icon-button" onClick={handleSearchSubmit}>
                <img src={`${process.env.PUBLIC_URL}/search-icon.png`} alt="Go" />
            </button>
            
            </div>
        </header>
    );
}

export default Header;
