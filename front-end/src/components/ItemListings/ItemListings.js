import React, { useState, useEffect } from "react";
import "./ItemListings.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Item(props) {
    const imageUrl = props.details.download_url  || process.env.PUBLIC_URL + '/listing-placeholder.png';

    return (
            <article className="item">
                <Link to="/buyerverproductdetail/for/:prompt"> <img src={imageUrl} alt={props.details.author} /> </Link>
                <Link to="/buyerverproductdetail/for/:prompt"> <span>{props.details.author}</span> </Link>
            </article>
    );
}

function ItemListings({ items }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            if(!items) { // Only fetch if items prop is not provided
                const result = await axios(
                    "https://picsum.photos/v2/list?page=3&limit=100"
                );
                setData(result.data);
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
