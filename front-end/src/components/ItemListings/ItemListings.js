import React, { useState, useEffect } from "react";
import "./ItemListings.css";
import { Link } from "react-router-dom";

function Item(props) {
    //const imageUrl = props.details.imagePath || process.env.PUBLIC_URL + '/listing-placeholder.png';
    const imageUrl = `http://localhost:3001/uploads/${props.details.imagePath}`;
    const productName = props.details.productName;
    const productId = props.details._id; // Assuming MongoDB's default _id is used as the unique identifier

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
                    const response = await fetch('http://localhost:3001/api/item-listings');
                    if (response.ok) {
                        const items = await response.json();
                        console.log(items); // Logging the fetched data
                        setData(items);
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
