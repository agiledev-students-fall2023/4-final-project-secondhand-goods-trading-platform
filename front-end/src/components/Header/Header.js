import React, { useState } from 'react'; 
import './Header.css';
import { Link , useNavigate} from "react-router-dom"


function Header() {

    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const handleSearchSubmit = () => {
        console.log("Searched:", searchValue); // testing
        navigate(`/searchresults/for/prompt=${searchValue}`);
    };



    return (
        <header className="header">
            <Link to="/home">
                <button className="icon-button"><img src={`${process.env.PUBLIC_URL}/home-icon.png`} alt="Home"/></button>
            </Link>

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

        </header>
    );
}

export default Header;
