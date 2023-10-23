import React, { useState, useEffect } from "react";
import "./ItemListings.css";
import axios from "axios";

function Item(props) {
    // Using a default image if props.details.image is not provided
    const imageUrl = props.details.image || process.env.PUBLIC_URL + '/listing-placeholder.png';

    return (
        <article className="item">
            <img src={imageUrl} alt={props.details.title} />
            <span>{props.details.title}</span>
        </article>
    );
}
function ItemListings() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await axios(
                // Using the animals provided in class to test if the fetch from server is successful
                "https://my.api.mockaroo.com/animals.json?key=d9ddfc40"
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
