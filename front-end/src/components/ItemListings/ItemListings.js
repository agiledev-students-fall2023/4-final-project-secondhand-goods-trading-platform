import React, { useState, useEffect } from "react";
import "./ItemListings.css";
import axios from "axios";

function Item(props) {
    // Using a default image if props.details.image is not provided
    const imageUrl = props.details.download_url  || process.env.PUBLIC_URL + '/listing-placeholder.png';


    /* author and download_url are only for testing. Subject to change in future.*/
    return (
        <article className="item">
            <img src={imageUrl} alt={props.details.author} />
            <span>{props.details.author}</span>
        </article>
    );
}
function ItemListings() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await axios(
                // Using the animals provided in class to test if the fetch is successful
                "https://picsum.photos/v2/list?page=3&limit=100"
            );
            setData(result.data);
        }

        fetchData();
    }, []);

    return (
        <>
            <section className="item-listings">
                {data.map((item,index) => (
                    <Item key={index} details={item} />
                ))}
            </section>
        </>
    );
}

export default ItemListings;
