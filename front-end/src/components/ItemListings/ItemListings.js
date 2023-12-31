import React, { useState, useEffect } from "react";
import "./ItemListings.css";
import { Link } from "react-router-dom";

function Item(props) {
    // to show the first picture of all 4 pictures as the cover
    const imageUrl = `http://167.172.230.126:3001/uploads/${props.details.imagePaths[0]}`;
    const productName = props.details.productName;
    const productId = props.details._id; 

    return (
        <article className="item">
            <Link to={`/buyerverproductdetail/for/${productId}`}>
                <img src={imageUrl} alt={productName} />
            </Link>
            <Link to={`/buyerverproductdetail/for/${productId}`}>
                <p>{productName}</p>
            </Link>
        </article>
    );
}

function ItemListings({ items }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            if (!items) { // Only fetch if items prop is not provided
                try {
                    const response = await fetch('http://167.172.230.126:3001/api/item-listings');
                    if (response.ok) {
                        const fetchedItems = await response.json();
                        console.log(fetchedItems); // Logging the fetched data
                        //only display available products in the home page
                        const availableItems = fetchedItems.filter(item => item.status === 'Available');
                        setData(availableItems);
                    } else {
                        throw new Error('Network response was not ok.');
                    }
                } catch (error) {
                    console.error('Error fetching item listings:', error);
                }
            }
        }
    
        fetchData();
    }, [items]);

    const displayItems = items || data; // Use items prop if provided, else use fetched data

    return (
        <section className="item-listings">
            {displayItems.map((item, index) => (
                <Item key={index} details={item} />
            ))}
        </section>
    );
}

export default ItemListings;
