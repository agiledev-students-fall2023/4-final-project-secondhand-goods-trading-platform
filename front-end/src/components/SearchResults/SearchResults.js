import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import ItemListings from '../ItemListings/ItemListings';

const SearchResults = () => {

    const { prompt } = useParams();
    const searchText = decodeURIComponent(prompt.replace('prompt=', ''));

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://167.172.230.126:3001/api/item-listings');
                setData(response.data);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchData();
    }, [prompt]);

    const filteredData = data.filter(item =>
        item.productName.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div>
            <Header />
            <h2>Search Results for "{searchText}"</h2>
            {filteredData.length > 0 ? (
                <ItemListings items={filteredData} />
            ) : (
                <p>No results found "{searchText}".</p>
            )}
        </div>
    );
}

export default SearchResults;